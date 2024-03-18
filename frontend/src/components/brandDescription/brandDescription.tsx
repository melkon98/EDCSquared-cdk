import { BrandBrief, USER_TYPES } from 'API';
import CampaignSlider from 'components/campaignSlider/campaignSlider';
import AuthorizeTikTokHandler from 'pages/authorizeTikTok/authorizeTikTokHandler';
import { FC, useMemo, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useNavigate } from 'react-router-dom';
import { withProfile } from 'state/profileSteps';
import { BrandRoutes, ProfileProps } from 'utils';
import './brandDescription.css';

interface Props {
  detail?: string | null;
  id: string;
  name: string;
  videoUrls?: Array<string | null> | null;
  hashtags?: string[];
  description?: string;
  onBack: () => void;
  isVideoLinked?: boolean;
  showSuccessModal: () => void;
  brief?: BrandBrief;
}

export const BrandDesciption: FC<Props & ProfileProps> = ({
  detail,
  id,
  name,
  isVideoLinked,
  profileState: { data },
  videoUrls,
  hashtags,
  description,
  brief,
}) => {
  const [showPopup, setPopupVisibility] = useState(false);
  const [, setShowInspiration] = useState(true);
  const navigate = useNavigate();
  const authenticatedUrls = useMemo(() => {
    if (!videoUrls) return [];
    return videoUrls.filter((e) => e?.length) as Array<string>;
  }, [videoUrls]);
  const makeLinks = (text) => {
    const urlRegex =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
    const html = text.replace(
      urlRegex,
      (url) => `<a href="${url}" target="_blank">${url}</a>`
    );
    return html;
  };
  return (
    <div className="w-full mt-[20px]">
      <div className="grid lg:grid-cols-2 gap-[20px] gap-x-[20px]">
        <div>
          <section
            className={`flex flex-col flex-1 rounded-[16px] border border-[#F5F1E8] py-[28px] pl-[28px]  bg-white min-h-[calc(50vh-100px)]`}
          >
            <div className="flex sm:items-start items-center justify-between mb-[10px]">
              <div className="flex items-center ">
                <img
                  src="menu-icons/menu-icon-2.svg"
                  className="mr-[14px] cursor-auto"
                />
                <h6 className=" text-[#0E0D0D] head-text font-[700] text-[14px] uppercase ">
                  Brand activation details
                </h6>
              </div>
              {data?.userType === USER_TYPES.BRAND_USER ? (
                <div
                  className="creator-button cursor-pointer bg-[#74BC73] mr-[28px]"
                  onClick={() => {
                    navigate(BrandRoutes.EditBrief, {
                      state: {
                        brief,
                      },
                    });
                  }}
                >
                  <img src="images/edit.svg" alt="" /> Edit
                </div>
              ) : null}
            </div>
            <div className="max-h-[266px] overflow-x-auto">
              <p className="text-[#0E0D0D] prose mt-[25px] sm:pr-[49px] pr-[28px] whitespace-pre-line break-all">
                {ReactHtmlParser(makeLinks(detail))}
              </p>
            </div>
          </section>
          <section
            className={`flex mt-[20px] min-h-[calc(50vh-100px)] flex-col flex-1 rounded-[16px] border border-[#F5F1E8] py-[28px] pl-[28px] pr-[28px] bg-white xl:mb-0`}
          >
            <div className="flex items-center ">
              <img
                src="menu-icons/menu-icon-9.svg"
                className="mr-[14px] cursor-auto"
              />
              <h6 className=" text-[#0E0D0D] head-text font-[700] text-[14px] uppercase ">
                Brand Profile
              </h6>
            </div>
            <div className="brand-dashboard__profile-group sm:grid flex flex-col grid-cols-2 gap-[40px] mb-[10px] mt-[26px] h-full">
              <div className="col-span-1">
                <div className="flex items-center justify-between">
                  <h6 className="text-[#0E0D0D] head-text font-[700] text-[16px] uppercase">
                    #BRAND TAGS
                  </h6>
                </div>
                <div className="sm:flex block flex-wrap relative mt-0">
                  <div className="relative 2xl:ml-[25px] ml-0 h-full md:w-[300px] sm:w-[237px] w-full brand-dashboard__profile-group col-span-4 mt-[85px]">
                    <div className="flex flex-wrap lg:h-auto h-[125px]">
                      {hashtags?.length
                        ? hashtags.map((hashtag, index) => {
                          return (
                            <div
                              key={index}
                              className={`border bg-[#202020] max-w-[138px] text-[#fff] rounded-[80px] m-1 cursor-pointer ${hashtag?.split(' ') && hashtag.length > 9
                                ? 'w-[138px] justify-center'
                                : ''
                                } min-w-[20px] flex px-2 py-1 absolute position-${index + 1
                                }`}
                            >
                              <span>{hashtag}</span>{' '}
                            </div>
                          );
                        })
                        : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-1">
                <h6 className="text-[#0E0D0D] head-text font-[700] text-[16px] uppercase mb-[10px]">
                  description
                </h6>
                <div className="h-[145px] overflow-x-auto pr-[4px]">
                  <div>{description}</div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div
          className={`flex flex-col flex-1 rounded-[16px] border border-[#F5F1E8] py-[28px] pl-[28px] pr-[28px] bg-white h-[calc(100vh-181px)] min-h-[630px]`}
        >
          <CampaignSlider
            videoUrls={authenticatedUrls}
            onClose={(): void => setShowInspiration(false)}
          />
        </div>
      </div>
      {showPopup && (
        <AuthorizeTikTokHandler
          briefId={id}
          BriefName={name}
          brandName={brief?.brandProfile?.name || ''}
          briefDescription={brief?.brandBriefDetails || ''}
          brandImageUrl={brief?.brandImageUrl || ''}
          onCross={(): void => setPopupVisibility(false)}
          isSparkAds={!!brief?.tikTokData?.tikTokSparkAds}
          disableBackground
        />
      )}

      {data?.userType === USER_TYPES.CREATIVE_USER && (
        <div className="w-full flex justify-center gap-4 md:mt-[28px] mt-[30px] mb-[30px]">
          <button
            className="manageProfile-btn bg-[#74BC73] disabled:bg-gray-400"
            onClick={(): void => {
              if (brief?.active) setPopupVisibility(true);
            }}
            disabled={isVideoLinked || !brief?.active}
          >
            <img src="menu-icons/menu-icon-4.svg" />
            <h6>Submit Content</h6>
          </button>
        </div>
      )}
    </div>
  );
};

export default withProfile(BrandDesciption);
