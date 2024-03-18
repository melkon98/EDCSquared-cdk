import { BrandBrief, CreativeRequest, GetCreativeRequestsQuery, USER_TYPES } from 'API';
import { Storage } from 'aws-amplify';
import Modal from 'components/authentication/modal';
import BrandDesciption from 'components/brandDescription/brandDescription';
import CreatorStatsCard from 'components/creatorStatsCard/creatorStatsCard';
import GradientCard from 'components/gradientCard/gradientCard';
import { default as ModalBase } from 'components/ui/modal';
import { GetCampaignSpent, GetCreativeRequestsStats } from 'hooks';
import AuthorizeTikTokHandler from 'pages/authorizeTikTok/authorizeTikTokHandler';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthRoutes, BrandDashboardBoxes, BrandRoutes } from 'utils';

interface Props {
  data: BrandBrief;
  userType: string;
  hashtags?: any;
  description?: string;
  id?: string;
  requests?: NonNullable<NonNullable<GetCreativeRequestsQuery['getCreativeRequests']>['items']>;
  onBack: () => void;
}

const CampaignBriefDetails: FC<Props> = ({
  onBack,
  data,
  userType,
  description,
  id,
  hashtags,
}) => {
  const navigate = useNavigate();
  const [showDetails, handleDetailVisibility] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPopup, setPopupVisibility] = useState(false);
  const { getCampaignSpents, data: spent } = GetCampaignSpent();
  const { getCreativeRequestsStats, data: stats } = GetCreativeRequestsStats();
  const [filesUrl, setFilesUrl] = useState<string | null>(null);

  useEffect(() => {
    getCampaignSpents({ variables: { userId: id } });
    if (userType === USER_TYPES.BRAND_USER) {
      getCreativeRequestsStats({ variables: { brandId: data.brandId } });
    }

    if (userType === USER_TYPES.CREATIVE_USER && data?.brandBriefFilesUrl) {
      setUrl(data.brandBriefFilesUrl);
    }
  }, []);

  const setUrl = async (key: string) => {
    const url = await Storage.get(key);
    setFilesUrl(url);
  };

  const onDownloadClick = async () => {
    if (!filesUrl) {
      return;
    }

    const link = document.createElement('a');
    link.href = filesUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  };

  return (
    <>
      <section>
        {userType !== USER_TYPES.BRAND_USER ? (
          <div className="lg:grid flex grid-cols-4 lg:gap-[20px] gap-[10px] mb-[20px] w-full lg:overflow-x-visible overflow-x-auto overflow-y-hidden creator-dashboard p-0 lg:pb-0 pb-[4px]">
            <GradientCard>
              <CreatorStatsCard
                type={BrandDashboardBoxes.Brand}
                value={data.brandProfile?.name || ''}
                isTooltip={true}
                boxesType="briefDetails"
              />
            </GradientCard>
            <GradientCard>
              <CreatorStatsCard
                type={BrandDashboardBoxes.Brief}
                value={data.BriefName || ''}
                isTooltip={true}
                boxesType="briefDetails"
              />
            </GradientCard>
            <GradientCard>
              <CreatorStatsCard
                type={BrandDashboardBoxes.Objective}
                value={data.objective || ''}
                isTooltip={true}
                boxesType="briefDetails"
              />
            </GradientCard>
            <GradientCard>
              <div className="flex items-start lg:w-full w-[170px]">
                <div>
                  <h6
                    className={`creator-dashboard__item-block-key mb-[10px] head-text text-black opacity-50 font-[700] uppercase`}
                  >
                    Creative Submission
                  </h6>
                </div>
              </div>

              <div className="flex justify-evenly p-1">
                <button
                  className="discover-btn min-w-[100px] cursor-pointer text-[14px] disabled:bg-[#a8a8a8]"
                  onClick={onDownloadClick}
                  disabled={!filesUrl}
                >
                  Download files
                </button>

                <div
                  onClick={() => {
                    if (data.active) setPopupVisibility(true);
                  }}
                  className="discover-btn min-w-[100px] cursor-pointer"
                  data-cy="submit-creative"
                >
                  <p className="text-[14px] text-center">Submit content</p>
                </div>
              </div>
            </GradientCard>
          </div>
        ) : (
          <div className="lg:grid flex grid-cols-4 lg:gap-[20px] gap-[10px] mb-[20px] w-full lg:overflow-x-visible overflow-x-auto overflow-y-hidden creator-dashboard p-0 lg:pb-0 pb-[4px]">
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
        )}

        <Modal
          isOpen={showSuccessModal}
          content="Your creative has been successfully linked!"
          handleClose={() => setShowSuccessModal(false)}
          actionLabel="BACK TO DASHBOARD"
          actionHandler={() => navigate(AuthRoutes.Dashboard)}
          type="creator"
        />
        <ModalBase
          title={`Brand details - ${data.brandProfile?.name}`}
          isOpen={showDetails}
          handleClose={() => handleDetailVisibility(false)}
        >
          <div className="flex flex-col gap-3 mt-6 font-sans text-neutral-400">
            <span>
              <b>Strap line:</b> {data.brandProfile?.strapLine}
            </span>
            <span>
              <b>Mission statement:</b> {data.brandProfile?.internalMission}
            </span>
            <div>
              <b>Brand Pillars:</b>
              <ul className="list-disc text-[#E9D8A6] pl-4 pt-3">
                {data.brandProfile?.pillars?.map((e) => {
                  if (!e) return '';
                  const [title, detail] = e.split(':');
                  if (detail?.length)
                    return (
                      <li>
                        <p className="text-neutral-400">
                          <b>{title}</b>: {detail}
                        </p>
                      </li>
                    );
                  return (
                    <li key={e}>
                      <p className="text-neutral-400">{title}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
            <span>
              <b>Tone of voice:</b> {data.brandProfile?.toneVoice}
            </span>
            <div className="w-full flex justify-center text-white mt-5">
              <button
                className="creator-button"
                onClick={() => handleDetailVisibility(false)}
              >
                DONE
              </button>
            </div>
          </div>
        </ModalBase>
      </section>
      <BrandDesciption
        id={data.id}
        hashtags={
          (data.brandProfile?.hashtags || hashtags) as string[] | undefined
        }
        description={
          data.brandProfile?.personalDescription || description || ''
        }
        name={data.BriefName || ''}
        detail={data.brandBriefDetails}
        videoUrls={data.creativeInspirations}
        isVideoLinked={false}
        showSuccessModal={() => setShowSuccessModal(true)}
        onBack={() => onBack()}
        brief={data}
      />
      {showPopup && (
        <AuthorizeTikTokHandler
          briefId={data.id || ''}
          BriefName={data.BriefName || ''}
          brandName={data.brandProfile?.name || ''}
          briefDescription={data?.brandBriefDetails || ''}
          // TODO: Fix
          brandImageUrl={''}
          // brandImageUrl={data?.brandImageUrl || ''}
          onCross={(): void => setPopupVisibility(false)}
          isSparkAds={!!data?.tikTokData?.tikTokSparkAds}
          disableBackground
        />
      )}
    </>
  );
};

export default CampaignBriefDetails;
