import './brandDashboard.css';
import { useNavigate } from 'react-router-dom';
import { BrandRoutes } from 'utils';
import { FC, useContext, useEffect, useState } from 'react';
import { BrandProfile } from 'API';
import { Storage } from 'aws-amplify';
import { ProfileContext } from "../../state/profileSteps";

interface Props {
  brand?: BrandProfile | null;
}
export const BrandInfo: FC<Props> = ({ brand }) => {
  const navigate = useNavigate();
  const { profileState } = useContext(ProfileContext)
  const [profilePic, setProfilePic] = useState<string>();
  const getImageFromS3 = async (id: string): Promise<void> => {
    try {
      const url = await Storage.get(`${id}/avatar/profile`);
      fetch(url).then((res) => {
        if (res.status === 200) setProfilePic(url);
      });
    } catch (err) {
      console.log('Error', err);
    }
  };

  useEffect(() => {
    if (profileState.data?.id) {
      getImageFromS3(profileState.data?.id)
    }
  }, [])

  const goToBrandPage = (): void => navigate(BrandRoutes.Brand);

  return (
    <div className="brand-dashboard__item h-[200px] md:mt-[34px]">
      <div className="brand-dashboard__bg h-[200px]"></div>
      <div className="brand-dashboard__item-content">
        <div className="brand-dashboard__top">
          <div className="brand-dashboard__top-contact">
            <img
              alt=""
              src={`${profilePic || '/images/default-image.png'}`}
              className="brand-dashboard__top-photo"
            />
            <div className="brand-dashboard__top-info">
              <div className="brand-dashboard__top-name">
                {brand?.name || 'brand name'}
              </div>
              <div className="brand-dashboard__top-profile">Brand Profile</div>
            </div>
          </div>
          <img
            onClick={goToBrandPage}
            className="brand-dashboard__top-icon"
            alt=""
            src="/images/dots-white.svg"
          />
        </div>
        <div className="text-white pt-2 px-[24px]">
          {brand?.description ? (brand?.description?.length > 150 ? brand?.description?.slice(0, 150) + '...' : brand?.description) : 'Brand Description'}
        </div>
        <div className="brand-dashboard__item-bottom flex justify-end" onClick={goToBrandPage}>
          <button className="creator-button bg-[#F1EBDF] text-black">Brand Profile</button>
        </div>
      </div>
    </div>
  );
};

export default BrandInfo;
