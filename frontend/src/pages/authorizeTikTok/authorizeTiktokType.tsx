import { FC } from 'react';
import AuthorizeTikTokHeader from './authorizeTikTokHeader';

interface Props {
  goToNext: () => void;
  onCross: () => void;
  goToUpload: () => void;
  isSparkAds?: boolean;
}

export const AuthorizeTiktokType: FC<Props> = ({
  goToNext,
  goToUpload,
  isSparkAds,
  ...props
}) => {
  return (
    <div
      className="tik-tok-modal bg-[#E5E2DC] w-[269px]"
      onClick={(e) => e.stopPropagation()}
    >
      <AuthorizeTikTokHeader {...props} title="Select the method" />
      <div className="tik-tok-method flex-col gap-[22px]">
        {isSparkAds && (
          <button
            className="creator-button justify-start border border-black bg-[#74BC73] w-[190px]"
            onClick={goToNext}
            data-cy="tiktok-via-code"
          >
            <h6 className="text-[#27272A] text-[14px] font-medium mr-[12px]">
              TikTok spark ads
            </h6>
            <img src="images/tiktok-icon.svg" className="w-[24px] h-[24px]" />
          </button>
        )}
        {/* <button className='creator-button justify-start border border-black bg-[#74BC73] w-[190px]' onClick={goToNext} data-cy="tiktok-via-code">
          <h6 className='text-[#27272A] text-[16px] font-medium mr-[12px]'>Instagram</h6> 
          <img src="images/instagram-icon.png" className='w-[24px] h-[24px]' />
        </button>
        <button className='creator-button justify-start border border-black bg-[#74BC73] w-[190px]' onClick={goToNext} data-cy="tiktok-via-code">
          <h6 className='text-[#27272A] text-[16px] font-medium mr-[12px]'>YouTube shorts</h6> 
          <img src="images/youtube.svg" className='w-[24px] h-[24px]' />
        </button> */}
        <button
          data-cy="upload-creative-video"
          className="creator-button justify-start border border-black bg-[#74BC73] w-[190px]"
          onClick={goToUpload}
        >
          <h6 className="text-[#27272A] text-[16px] font-medium mr-[12px]">
            Upload
          </h6>
          <img src="menu-icons/menu-icon-4.svg" className="w-[24px] h-[24px]" />
        </button>
      </div>
    </div>
  );
};

export default AuthorizeTiktokType;
