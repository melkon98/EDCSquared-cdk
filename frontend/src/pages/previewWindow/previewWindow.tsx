import { Storage } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  FacebookEmbed,
  TikTokEmbed,
  YouTubeEmbed,
} from 'react-social-media-embed';
import PdfViewer from './pdfViewer';

type ParamsType = {
  url: string;
};

const PreviewWindow = () => {
  const { url = '' } = useParams<ParamsType>();
  const [videoUrl, setVideoUrl] = useState('');
  const [id, setId] = useState<string>('');
  const [pdf, setPdf] = useState('');
  const [showPdf, setShowPdf] = useState(false);
  const getAwsUrl = async () => {
    const previewUrl = url?.split('!').join('/');
    const AwsUrl = await Storage.get(
      previewUrl.includes('public/')
        ? previewUrl.replace('public/', '')
        : previewUrl
    );

    try {
      fetch(AwsUrl).then((res) => {
        if (res.status === 200) {
          setVideoUrl(res.url);
        }
      });
    } catch (err) {
      setVideoUrl('');
    }
  };
  const getSocialVideoUrl = async () => {
    setVideoUrl(url?.split('!').join('/'));
  };
  const getDriveGoogleUrl = (videoUrl: string) => {
    const splitedUrl = videoUrl.split('/');
    if (splitedUrl[splitedUrl.length - 2])
      return `https://drive.google.com/uc?id=${splitedUrl[splitedUrl.length - 2]
        }`;
    else return '';
  };
  const getPdf = async () => {
    try {
      const pdfUrl = await Storage.get(`SubmissionPdf/${url?.split('!')[1]}`);
      fetch(pdfUrl).then((res) => {
        if (res.status === 200) {
          setPdf(pdfUrl);
        }
      });
    } catch (err) {
      console.log('Error', err);
    }
  };
  useEffect(() => {
    getPdf();
    if (url.includes('mp4') || url.includes('MOV') || url.includes('mov')) {
      getAwsUrl();
    } else {
      getSocialVideoUrl();
    }
    const videoUrl = new URL(window.location.href);
    setId(videoUrl.searchParams.get('id') || '');
  }, []);

  return (
    <div className="flex justify-center items-center flex-col h-[calc(100vh-80px)]">
      <div className="m-5">
        <a href="/">
          <img src="/images/creator-logo-full.png" alt="" />
        </a>
      </div>
      {url.includes('facebook') ? (
        <FacebookEmbed url={videoUrl} width="100%" height={620} />
      ) : url.includes('youtube') ? (
        <YouTubeEmbed url={videoUrl} width="100%" height={620} />
      ) : url.includes('tiktok') ? (
        <TikTokEmbed url={videoUrl} width="100%" height={620} />
      ) : url.includes('drive.google.com') && getDriveGoogleUrl(url) ? (
        <video width="100%" className="h-[620px]" controls>
          <source src={getDriveGoogleUrl(url)} type="video/mp4" />
        </video>
      ) : videoUrl ? (
        <div className="h-[520px] relative sm:w-[286px]">
          <img
            src="/images/iPhone-bg.png"
            className="h-full w-full absolute m-auto lg:block hidden"
            alt=""
          />
          <video
            controls
            className="outline-none h-full object-contain m-auto lg:rounded-[45px] lg:p-[3px]"
            autoPlay
            playsInline
            muted
          >
            <source src={videoUrl} />
          </video>
        </div>
      ) : null}
      {videoUrl ? (
        <>
          <div className="flex items-center mt-[20px]">
            <h1 className="text-[24px] mr-[20px] head-text uppercase">
              Creative ID: {id}
            </h1>
          </div>
          {pdf ? (
            <div className="flex items-center">
              <h6
                className="head-text text-[20px] cursor-pointer"
                onClick={() => setShowPdf(true)}
              >
                See Details
              </h6>
              <h6 className="head-text text-[20px] mx-[10px]">or</h6>
              <a href={pdf} download>
                <img
                  src="/images/pdf.png"
                  alt=""
                  className="w-[25px] h-[25px]"
                />
              </a>
            </div>
          ) : null}
          {showPdf ? (
            <PdfViewer fileUrl={pdf} onClose={() => setShowPdf(false)} />
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default PreviewWindow;
