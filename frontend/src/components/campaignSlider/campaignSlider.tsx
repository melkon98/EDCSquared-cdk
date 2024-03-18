import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Storage } from 'aws-amplify';
import { isValidUrl } from 'components/helpers';
import { FC, useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import {
  FacebookEmbed,
  InstagramEmbed,
  TikTokEmbed,
  YouTubeEmbed,
} from 'react-social-media-embed';
import './campaignSlider.css';

interface Props {
  videoUrls: Array<string>;
  onClose: () => void;
}

const MOBILE_WIDTH_THRESHOLD = 1281;

export const CampaignSlider: FC<Props> = ({ videoUrls }) => {
  const [sliderPage, setSliderPage] = useState(0);
  const [awsUrls, setAwsUrls] = useState<any[]>([]);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const getEmbeddedUrl = (e: string): string => {
    try {
      const { hostname, pathname } = new URL(e);
      if (hostname.includes('tiktok.com')) {
        const videoId = pathname.split('/').at(-1);
        const isValidId = /^\d+$/.test(videoId || '');
        if (videoId?.length && isValidId)
          return `https://www.tiktok.com/embed/v2/${videoId}`;
      } else if (hostname.includes('youtube.com')) {
        const videoId = e.split('&').at(-2)?.slice(2);
        if (videoId?.length) return `https://www.youtube.com/embed/${videoId}`;
      } else if (hostname.includes('facebook.com')) {
        const videoId = pathname.split('/').at(-1);
        if (videoId?.length)
          return `https://www.facebook.com/FacebookDevelopers/videos/${videoId}/`;
      } else if (hostname.includes('instagram.com')) {
        const videoId =
          pathname.split('/').at(-1) || pathname.split('/').at(-2);
        if (videoId?.length) return `https://www.instagram.com/p/${videoId}/`;
      }
      return e;
    } catch (err) {
      return e;
    }
  };
  const getDriveGoogleUrl = (videoUrl: string) => {
    const splitedUrl = videoUrl.split('/');
    if (splitedUrl[splitedUrl.length - 2])
      return `https://drive.google.com/file/d/${
        splitedUrl[splitedUrl.length - 2]
      }/preview`;
    else return '';
  };

  const getAwsUrl = async (videoKey: string) => {
    const url = await Storage.get(videoKey);
    console.log(videoKey?.replace('public/', ''), url);

    const awsData: any = { key: videoKey, url };
    setAwsUrls((prev: any) => {
      prev.push(awsData);
      return prev;
    });
  };
  useEffect(() => {
    for (const data of videoUrls) {
      if (data.includes('creative/') || data.includes('inspiration')) {
        getAwsUrl(data);
      }
    }
  }, []);
  useEffect(() => {
    if (window.innerWidth < MOBILE_WIDTH_THRESHOLD) {
      setIsAutoPlay(true);
      setInterval(() => {
        setIsAutoPlay(false);
      }, 1000);
    }
  }, []);
  return (
    <div className="md:h-[calc(100vh-238px)] min-h-[580px] h-full">
      <div className="creative-inspiration-header">
        <div className="flex items-center ">
          <img
            src="menu-icons/menu-icon-3.svg"
            className="mr-[14px] cursor-auto"
          />
          <h6 className=" text-[#0E0D0D] head-text font-[700] text-[14px] uppercase ">
            Creative inspiration
          </h6>
        </div>
      </div>
      <div className="relative m-auto lg:w-[85%] w-full h-full sm:overflow-hidden pb-[40px]">
        {videoUrls?.length ? (
          <Carousel
            variant="dark"
            indicators={false}
            activeIndex={sliderPage}
            className="carousel-wrapper relative my-4 h-full"
            interval={null}
            controls={false}
            slide={false}
          >
            {videoUrls.map((video, index) => (
              <Carousel.Item key={index} className="w-full h-full">
                {isValidUrl(video) ||
                video.includes('creative/') ||
                video.includes('inspiration') ? (
                  <div className="inspiration-video-iframe-wrap h-full flex justify-center items-center">
                    {video.includes('facebook') && (
                      <FacebookEmbed
                        url={getEmbeddedUrl(video)}
                        width="100%"
                        height="620px"
                      />
                    )}
                    {video.includes('youtube') && (
                      <YouTubeEmbed
                        url={getEmbeddedUrl(video)}
                        width="100%"
                        height="620px"
                      />
                    )}
                    {video.includes('tiktok') && (
                      <TikTokEmbed
                        width="100%"
                        height="100%"
                        url={getEmbeddedUrl(video)}
                      />
                    )}
                    {video.includes('instagram') && (
                      <InstagramEmbed
                        width="100%"
                        height="620px"
                        url={getEmbeddedUrl(video)}
                      />
                    )}
                    {video.includes('drive.google.com') &&
                    getDriveGoogleUrl(video) ? (
                      <div className="h-full">
                        <iframe
                          src={getDriveGoogleUrl(video)}
                          width="100%"
                          height="100%"
                          allowFullScreen
                          id="myFrame"
                          sandbox="allow-popups allow-popups-to-escape-sandbox allow-scripts allow-top-navigation allow-same-origin"
                        ></iframe>
                      </div>
                    ) : null}
                    {(video.includes('creative/') ||
                      video.includes('inspiration')) &&
                    awsUrls?.length ? (
                      <div className="h-full">
                        <video
                          width="100%"
                          src={awsUrls?.find((data) => data.key === video)?.url}
                          className="h-full"
                          controls
                          autoPlay={isAutoPlay}
                          muted
                          playsInline
                        ></video>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className="invalid-inspiration-video">
                    No Video Exists
                  </div>
                )}
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <div className="h-full flex justify-center items-center text-[#0E0D0D] head-text font-[700] text-[16px] uppercase">
            Inspiration videos are absent
          </div>
        )}

        {videoUrls?.length > 1 ? (
          <>
            {sliderPage !== 0 && (
              <button
                type="button"
                className="absolute top-[calc(50%-15px)] sm:left-0 left-[-40px] rounded-[14px] h-[40px] w-[40px] flex items-center justify-center px-4 disabled:bg-[#7c7c7c] bg-[#b5b3b32e] hover:bg-[#8686862e] group focus:outline-none"
                data-carousel-prev
                onClick={() =>
                  setSliderPage((previousCount) => previousCount - 1)
                }
              >
                <span className="inline-flex items-center justify-center w-10 h-10">
                  <ChevronLeftIcon className="text-gray-400 w-[30px]" />
                </span>
              </button>
            )}
            {sliderPage + 1 !== videoUrls?.length && (
              <button
                type="button"
                className="absolute top-[calc(50%-15px)] sm:right-0 right-[-40px] z-30 rounded-[14px] h-[40px] w-[40px] flex items-center justify-center px-4 bg-[#b5b3b32e] hover:bg-[#8686862e] group focus:outline-none"
                data-carousel-next
                onClick={() =>
                  setSliderPage((previousCount) => previousCount + 1)
                }
              >
                <span className="inline-flex items-center justify-center w-10 h-10 ">
                  <ChevronRightIcon className="text-gray-400 w-[30px]" />
                </span>
              </button>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default CampaignSlider;
