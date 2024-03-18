import { FC } from 'react';
import { BrandProfile } from 'API';
import { useNavigate, useLocation } from 'react-router-dom';
import { BrandRoutes } from 'utils';

interface Props {
  data?: BrandProfile;
}

export const BrandBody: FC<Props> = ({ data }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const goToEditBrand = (): void => navigate(BrandRoutes.EditBrand);

  return (
    <>
      <div className="brand-dashboard__text">
        <p className='text-[#505050]'>
          <span className='text-[#0E0D0D]'>Brand name:</span>&nbsp;
          {data?.name}
        </p>
        <p className='text-[#505050]'>
          <span className='text-[#0E0D0D]'>Strap line:</span>&nbsp;
          {data?.strapLine}
        </p>
        <p className='text-[#505050]'>
          <span className='text-[#0E0D0D]'>Mission Statement:</span>&nbsp;
          {data?.internalMission}
        </p>
        <div className='mb-[16px] text-[#505050]'>
          <span className='text-[#0E0D0D]'>Brand Pillars:</span>&nbsp;
          {data?.pillars?.map((e, i) => (
            <div key={i} className='text-[#505050]'>{e}</div>
          ))}
        </div>
        <p className='text-[#505050]'>
          <span className='text-[#0E0D0D]'>Brand tone of voice:</span>&nbsp;
          {data?.toneVoice}
        </p>
      </div>
      {pathname.includes(BrandRoutes.Brand) && (
        <div className="brand-dashboard__item-button-wrap flex justify-center">
          <button
            className="creator-button"
            onClick={goToEditBrand}
          >
            Edit Brand
          </button>
        </div>
      )}
    </>
  );
};

export default BrandBody;
