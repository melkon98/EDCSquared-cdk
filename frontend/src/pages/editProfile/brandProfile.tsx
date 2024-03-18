import { USER_TYPES } from 'API';
import Modal from 'components/authentication/modal';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUpdateBrendProfile, withProfile } from 'state/profileSteps';
import { BrandRoutes, ProfileProps } from 'utils';
import './creatorProfile.css';
export const EditBrandProfile: FC<ProfileProps> = ({
  updateProfileData,
  profileState: { data },
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const linkTiktokAccount = (): void => {
    window.location.href = `https://ads.tiktok.com/marketing_api/auth?app_id=${process.env.REACT_APP_TKT_MARKETING_APP_ID
      }&state=your_custom_params&redirect_uri=${encodeURI(
        process.env.REACT_APP_FRONTEND_BASE_URL + 'branddashboard' || ''
      )}&rid=8w8cll1xcbs`;
  };

  const linkFacebookAccount = (): void => {
    window.location.href = `https://www.facebook.com/v10.0/dialog/oauth?client_id=${process.env.REACT_APP_FACEBOOK_MARKETING_APP_ID
      }&redirect_uri=${encodeURI(
        process.env.REACT_APP_FRONTEND_BASE_URL + 'brandFacebookAccount' || ''
      )}&scope=ads_management%20ads_read%20email%20public_profile`;
  };

  const linkYoutubeAccount = (): void => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${encodeURI(
      process.env.REACT_APP_FRONTEND_BASE_URL + 'brandYoutubeAccount'
    )}&prompt=consent&response_type=code&client_id=${process.env.REACT_APP_YOUTUBE_MARKETING_APP_ID
      }&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube&access_type=offline`;
  };

  useEffect(() => {
    if (data) {
      const { name, description, tiktokHandler } = data;
      const state = { name } as IUpdateBrendProfile;
      if (description) state.description = description;
      if (tiktokHandler) state.tiktokHandler = tiktokHandler;
    }
  }, [data]);

  useEffect(() => {
    if (isLoading && updateProfileData) {
      setShowSuccessModal(true);
      setIsLoading(false);
    }
  }, [isLoading, updateProfileData]);

  if (!data) return <></>;
  return (
    <>
      <div className="rounded-[16px]">
        <div>
          <div className="bg-transparent">
            <div className="brand-dashboard__profile-group mb-[20px]">
              <div className="brand-dashboard__profile-group">
                {data?.userType === USER_TYPES.BRAND_USER ? (
                  <>
                    <div className="">
                      <div className="flex justify-between items-center">
                        <div
                          onClick={() => {
                            data.tiktokAccountAccess ?
                              navigate(
                                `${BrandRoutes.LinkTiktokAccount}?change_user=true`
                              )
                              : linkTiktokAccount()
                          }}
                          className="border cursor-pointer border-black rounded-[4px] px-[12px] py-[6px] max-w-[calc(100%-96px)] min-w-[122px] w-full flex justify-between items-center"
                        >
                          <p
                            className={`${data.tiktokAccountAccess
                              ? 'text-[#1D1C1C]'
                              : 'text-[#6C757D]'
                              } text-[14px] font-[400] ellipsis`}
                          >
                            {data.tiktokAccountAccess &&
                              data.tiktokAccountAccess.advertisers_list
                              ? data.tiktokAccountAccess.advertisers_list.find(
                                (item) =>
                                  item.advertiser_id ===
                                  data.tiktokAccountAccess?.advertiser_id
                              )?.advertiser_name
                              : 'TikTok ads account link'}
                          </p>
                          {data.tiktokAccountAccess ? (
                            <img src="/images/check-icon.svg" alt="" />
                          ) : null}
                        </div>
                        <div
                          className="flex items-center justify-start w-[100px] pl-[19px] cursor-pointer"
                          onClick={linkTiktokAccount}
                        >
                          <img
                            className="h-[22px]"
                            src="/images/tiktok-icon.svg"
                          />
                          <div className="text-[#6C757D] text-[14px] font-[400] pl-[13px]">
                            {data.tiktokAccountAccess ? 'Linked' : 'Link'}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center my-[15px]">
                        <div
                          onClick={() => {
                            data.facebookAccountAccess ?
                              navigate(
                                `${BrandRoutes.LinkFacebookAccount}?change_user=true`
                              )
                              : linkFacebookAccount()
                          }}
                          className="border cursor-pointer border-black rounded-[4px] px-[12px] py-[6px] max-w-[calc(100%-96px)] min-w-[122px] w-full flex justify-between items-center"
                        >
                          <p
                            className={`${data.facebookAccountAccess
                              ? 'text-[#1D1C1C]'
                              : 'text-[#6C757D]'
                              } text-[14px] font-[400] ellipsis`}
                          >
                            {data.facebookAccountAccess &&
                              data.facebookAccountAccess.advertisers_list
                              ? data.facebookAccountAccess.advertisers_list.find(
                                (item) =>
                                  item.advertiser_id ===
                                  data.facebookAccountAccess?.advertiser_id
                              )?.advertiser_name
                              : 'META ads account link'}
                          </p>
                          {data.facebookAccountAccess ? (
                            <img src="/images/check-icon.svg" alt="" />
                          ) : null}
                        </div>
                        <div
                          className="flex items-center justify-start w-[100px] pl-[19px] cursor-pointer"
                          onClick={linkFacebookAccount}
                        >
                          <img
                            className="h-[22px]"
                            src="/images/facebook.svg"
                          />
                          <div className="text-[#6C757D] text-[14px] font-[400] pl-[13px]">
                            {data.facebookAccountAccess ? 'Linked' : 'Link'}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div
                          onClick={() => {
                            data.youtubeAccountAccess ?
                              navigate(
                                `${BrandRoutes.linkYoutubeAccount}?change_user=true`
                              )
                              : linkYoutubeAccount()
                          }}
                          className="border cursor-pointer border-black rounded-[4px] px-[12px] py-[6px] max-w-[calc(100%-96px)] min-w-[122px] w-full flex justify-between items-center"
                        >
                          <p
                            className={`${data.youtubeAccountAccess
                              ? 'text-[#1D1C1C]'
                              : 'text-[#6C757D]'
                              } text-[14px] font-[400] ellipsis`}
                          >
                            {data.youtubeAccountAccess &&
                              data.youtubeAccountAccess.advertisers_list
                              ? data.youtubeAccountAccess.advertisers_list.find(
                                (item) =>
                                  item.advertiser_id ===
                                  data.youtubeAccountAccess?.advertiser_id
                              )?.advertiser_name
                              : 'YouTube ads account link'}
                          </p>
                          {data.youtubeAccountAccess ? (
                            <img src="/images/check-icon.svg" alt="" />
                          ) : null}
                        </div>
                        <div
                          className="flex items-center justify-start w-[100px] pl-[19px] cursor-pointer"
                          onClick={linkYoutubeAccount}
                        >
                          <img
                            className="h-[22px]"
                            src="/images/youtube-linking-icon.svg"
                          />
                          <div className="text-[#6C757D] text-[14px] font-[400] pl-[13px]">
                            {data.youtubeAccountAccess ? 'Linked' : 'Link'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={showSuccessModal}
          handleClose={() => setShowSuccessModal(false)}
          type="brand"
          content="Your brand information successfully changed"
        />
      </div>
    </>
  );
};
export default withProfile(EditBrandProfile);
