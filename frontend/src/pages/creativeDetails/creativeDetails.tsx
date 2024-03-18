// @ts-nocheck: TODO: FIX V2
import { BrandBrief, CREATIVE_REQUEST_RESPONSE, CreateAdsMutationVariables, CreativeRequest, GetBrandBriefsQuery, GetCreativeRequestsQuery } from 'API';
import { Storage } from 'aws-amplify';
import ApprovalModal from 'components/adApprovalModal/Modal';
import { RequestWithBrief } from 'components/creativesTable/creativesTable';
import CreatorStatsCard from 'components/creatorStatsCard/creatorStatsCard';
import GradientCard from 'components/gradientCard/gradientCard';
import Modal from 'components/ui/modal';
import { GetCampaignSpent, GetCreativeRequestsStats } from 'hooks';
import _ from 'lodash';
import { FC, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import {
  FacebookEmbed,
  InstagramEmbed,
  TikTokEmbed,
  YouTubeEmbed,
} from 'react-social-media-embed';
import { withProfile } from 'state/profileSteps';
import { ViewRequestProps, withRequestView } from 'state/requests';
import { BrandDashboardBoxes, BrandRoutes, ProfileProps } from 'utils';
import { TWO_DAYS_IN_SECONDS } from '../../hooks/utils';

interface Props {
  creativeRequest: CREATIVE_REQUEST_RESPONSE
  requests: NonNullable<NonNullable<GetCreativeRequestsQuery['getCreativeRequests']>['items']>;
  onBack: () => void;
  briefs: NonNullable<NonNullable<GetBrandBriefsQuery['getBrandBriefs']>['items']>;
}

export const CreativeDetails: FC<Props & ProfileProps & ViewRequestProps> = ({
  creativeRequest,
  profileState,
  briefs,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showInspiration, setShowInspiration] = useState(false);
  const [awsURL, setAwsURL] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState('');
  const { getCampaignSpents, data: spent } = GetCampaignSpent();
  const { getCreativeRequestsStats, data: stats } = GetCreativeRequestsStats();

  const adPayload: CreateAdsMutationVariables = {
    adgroupId: briefs?.find(
      (brief) => brief?.id === creativeRequest.brandBriefId
    )?.tikTokData?.adgroupId,
    authCode: creativeRequest.tiktokVideoCode,
    adCaption: briefs?.find(
      (brief) => brief?.id === creativeRequest.brandBriefId
    )?.tikTokData?.adCaption,
    callToAction: briefs?.find(
      (brief) => brief?.id === creativeRequest.brandBriefId
    )?.tikTokData?.callToAction,
    videoUrl:
      !creativeRequest.tiktokVideoCode && creativeRequest.tiktokCreativeUrl
        ? `public/${creativeRequest.tiktokCreativeUrl}`
        : '',
    landingPageUrl: briefs?.find(
      (brief) => brief?.id === creativeRequest.brandBriefId
    )?.tikTokData?.landingPageUrl,
    identityId: briefs?.find(
      (brief) => brief?.id === creativeRequest.brandBriefId
    )?.tikTokData?.adIdentityId,
    displayName: briefs?.find(
      (brief) => brief?.id === creativeRequest.brandBriefId
    )?.tikTokData?.displayName,
    creativeRequestId: creativeRequest.id,
    creatorId: creativeRequest.creatorId,
  };

  useEffect(() => {
    if (creativeRequest) {
      const key = (
        creativeRequest?.creativePreviewUrl || creativeRequest.tiktokCreativeUrl
      )?.replace('public/', '');

      Storage.get(`${key}`, {
        expires: TWO_DAYS_IN_SECONDS,
      })
        .then((data) => {
          setAwsURL(data);
        })
        .catch((err) =>
          console.log(
            `Failed to load ${creativeRequest?.tiktokCreativeUrl}:`,
            err
          )
        );
    }
    if (creativeRequest?.tiktokVideoCode) {
      setVideoUrl(creativeRequest.tiktokVideoCode);
    }
  }, [creativeRequest]);
  useEffect(() => {
    getCampaignSpents({ variables: { userId: profileState.data?.id } });
  }, []);
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
      return `https://drive.google.com/uc?id=${splitedUrl[splitedUrl.length - 2]
        }`;
    else return '';
  };

  useEffect(() => {
    if (profileState.data?.brand) {
      getCreativeRequestsStats({
        variables: { brandId: profileState.data?.brand?.items[0]?.id },
      });
    }
  }, []);

  return (
    <>
      <section>
        <div className="lg:grid flex grid-cols-4 lg:gap-[20px] gap-[10px] w-full lg:overflow-x-visible overflow-x-auto overflow-y-hidden creator-dashboard p-0 lg:pb-0 pb-[4px] mb-[20px]">
          <GradientCard>
            <CreatorStatsCard
              type={BrandDashboardBoxes.Approved}
              value={`${stats?.approved || 0}`}
              seeMore={BrandRoutes.Creatives}
            />
          </GradientCard>
          <GradientCard>
            <CreatorStatsCard
              type={BrandDashboardBoxes.EffectiveCostPer}
              value={`$${spent ? Number(spent).toFixed(2) : '0.00'}`}
            />
          </GradientCard>
          <GradientCard>
            <CreatorStatsCard
              type={BrandDashboardBoxes.ContentApproval}
              value={`${stats?.all || 0}`}
              seeMore={BrandRoutes.Creatives}
            />
          </GradientCard>
          <GradientCard>
            <CreatorStatsCard
              type={BrandDashboardBoxes.Invite}
              value={'Copy short URL'}
              button="Copy short URL"
            />
          </GradientCard>
        </div>
      </section>
      <section>
        <div className="grid lg:grid-cols-2 gap-[20px] gap-x-[20px]">
          <div>
            <div
              className={`paper w-full min-h-[357px] 2xl:col-span-3 border border-[#F5F1E8]`}
            >
              <div className="flex items-center mb-[50px]">
                <img
                  src="menu-icons/menu-icon-2.svg"
                  className="mr-[14px] cursor-auto"
                />
                <h6 className=" text-[#0E0D0D] head-text font-[700] text-[14px] uppercase ">
                  Creator profile
                </h6>
              </div>
              <p>{creativeRequest.creatorDescription}</p>
            </div>
            <section
              className={`flex min-h-[357px] mt-[18px] h-auto flex-col flex-1 rounded-[16px] border border-[#F5F1E8] py-[28px] pl-[28px] pr-[28px] bg-white xl:mb-0`}
            >
              <div className="flex items-center ">
                <img
                  src="menu-icons/menu-icon-9.svg"
                  className="mr-[14px] cursor-auto"
                />
                <h6 className=" text-[#0E0D0D] head-text font-[700] text-[14px] uppercase ">
                  Brand profile
                </h6>
              </div>
              <div className="brand-dashboard__profile-group sm:grid flex flex-col grid-cols-12 gap-[20px] mb-[20px] mt-[26px]">
                <div className="col-span-6">
                  <div className="flex items-center justify-between">
                    <h6 className="text-[#0E0D0D] head-text font-[700] text-[16px] uppercase">
                      #BRAND TAGS
                    </h6>
                  </div>
                  <div className="sm:flex block flex-wrap relative mt-0 sm:ml-[20px]">
                    <div className="relative w-full h-full brand-dashboard__profile-group col-span-4 mt-[85px]">
                      <div className="flex flex-wrap lg:h-auto h-[125px]">
                        {profileState?.data?.hashtags?.length &&
                          profileState?.data?.hashtags.map(
                            (vertical, index) => {
                              return (
                                <div
                                  key={index}
                                  className={`border bg-[#202020] max-w-[138px] text-[#fff] rounded-[80px] m-1 cursor-pointer ${vertical?.split(' ') && vertical.length > 9
                                    ? 'w-[138px] justify-center'
                                    : ''
                                    } min-w-[20px] flex px-2 py-1 absolute position-${index + 1
                                    }`}
                                >
                                  <span>{vertical}</span>{' '}
                                </div>
                              );
                            }
                          )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-4">
                  <h6 className="text-[#0E0D0D] head-text font-[700] text-[16px] uppercase ">
                    description
                  </h6>
                  <div className="flex flex-col justify-between items-end h-full pt-[20px]">
                    <div className="w-full">
                      {profileState?.data?.description &&
                        profileState?.data?.description?.length > 130
                        ? profileState?.data?.description?.slice(0, 130) + '...'
                        : profileState?.data?.description}
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex flex-col justify-around items-center h-[200px] sm:mt-0 mt-[100px]">
                    {creativeRequest?.creativeTiktokHandle ? (
                      <a
                        href={creativeRequest?.creativeTiktokHandle}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src="images/tiktok-icon.svg" alt="" />
                      </a>
                    ) : null}
                    {creativeRequest?.creativeInstagramHandle ? (
                      <a
                        href={creativeRequest?.creativeInstagramHandle}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src="images/instagram-icon.png" alt="" />
                      </a>
                    ) : null}
                    {creativeRequest?.creativeYoutubeHandle ? (
                      <a
                        href={creativeRequest?.creativeYoutubeHandle}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src="images/youtube.svg" alt="" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </section>
          </div>
          {showInspiration ? (
            <div
              className="inspiration-panel pointer-events-auto z-[50]"
              onClick={() => setShowInspiration(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="z-[99] md:w-full flex flex-col justify-center items-center w-[90%]"
              >
                <ApprovalModal
                  videoUrl={creativeRequest.tiktokCreativeUrl || ''}
                  onClose={(): void => setShowInspiration(false)}
                  request={creativeRequest}
                  createAdPayload={adPayload}
                  brief={briefs?.find(
                    (brief) => brief?.id === creativeRequest.brandBriefId
                  )}
                />
              </div>
            </div>
          ) : (
            <div
              className={`flex flex-col flex-1 justify-between rounded-[16px] border border-[#F5F1E8] py-[28px] pl-[28px] pr-[28px] bg-white`}
            >
              <div>
                <div className="creative-inspiration-header mb-[10px] mt-[5px]">
                  <div className="flex items-center ">
                    <img
                      src="menu-icons/menu-icon-3.svg"
                      className="mr-[14px] cursor-auto"
                    />
                    <h6 className=" text-[#0E0D0D] head-text font-[700] text-[14px] uppercase leading-[1px]">
                      CREATIVE APPROVAL / {creativeRequest.uniqueId}
                    </h6>
                  </div>
                </div>
                <div
                  className={`inspiration-video-iframe-wrap lg:mb-0 mb-[10px] ${awsURL
                    ? 'lg:h-[520px] md:h-[412px] h-[287px]'
                    : 'md:h-[520px] h-[558px]'
                    } w-full flex justify-center items-center`}
                >
                  {awsURL ? (
                    <div className="h-full relative sm:w-[286px]">
                      <img
                        src="images/iPhone-bg.png"
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
                        <source src={awsURL} />
                      </video>
                    </div>
                  ) : videoUrl ? (
                    <div className="inspiration-video-iframe-wrap">
                      {videoUrl.includes('facebook') && (
                        <FacebookEmbed
                          url={getEmbeddedUrl(videoUrl)}
                          width="100%"
                          height="620px"
                        />
                      )}
                      {videoUrl.includes('youtube') && (
                        <YouTubeEmbed
                          url={getEmbeddedUrl(videoUrl)}
                          width="100%"
                          height="620px"
                        />
                      )}
                      {videoUrl.includes('tiktok') && (
                        <TikTokEmbed
                          url={getEmbeddedUrl(videoUrl)}
                          width="100%"
                          height="620px"
                        />
                      )}
                      {videoUrl.includes('instagram') && (
                        <InstagramEmbed
                          width="100%"
                          height="620px"
                          url={getEmbeddedUrl(videoUrl)}
                        />
                      )}
                      {videoUrl.includes('drive.google.com') &&
                        getDriveGoogleUrl(videoUrl) ? (
                        <video width="100%" className="h-[620px]" controls>
                          <source
                            src={getDriveGoogleUrl(videoUrl)}
                            type="video/mp4"
                          />
                        </video>
                      ) : null}
                    </div>
                  ) : (
                    <div className="invalid-inspiration-video">
                      No Video Exists
                    </div>
                  )}
                </div>
              </div>
              <button
                className="manageProfile-btn bg-[#74BC73] w-fit mx-auto mb-[27px]"
                onClick={() => setShowInspiration(true)}
                data-cy="review"
              >
                <img src="menu-icons/menu-icon-4.svg" />
                <h6>Approve / Reject Content</h6>
              </button>
            </div>
          )}

          <Modal
            title="Creator details"
            isOpen={showDetails}
            handleClose={() => setShowDetails(false)}
          >
            <div className="flex flex-col gap-4 mt-6 text-neutral-400">
              <span>
                <b>Creator name:</b> {creativeRequest.creatorProfile?.name}
              </span>
              <span>
                <b>Creator's TikTok handle:</b>{' '}
                {creativeRequest?.creativeTiktokHandle &&
                  `@${_.trimStart(creativeRequest?.creativeTiktokHandle, '@')}`}
              </span>
              <span>
                <b>Creator's description:</b>{' '}
                {creativeRequest.creatorProfile?.description}
              </span>
            </div>
            <div className="w-full flex justify-center text-white mt-5">
              <button
                className="creator-button"
                onClick={() => setShowDetails(false)}
              >
                DONE
              </button>
            </div>
          </Modal>
        </div>
      </section>
    </>
  );
};

export default withRequestView(withProfile(CreativeDetails));
