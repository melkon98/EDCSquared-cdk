import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AuthRoutes } from 'utils';
import './style.css';

interface Props {
  onClick: () => void;
}
export const TiktokHandlerAlertModal: FC<Props> = ({ onClick }) => {
  return (
    <div className="tiktok-handler-modal z-[99999]">
      <img
        src="/images/x-circle.png"
        className="close-icon-inspiration absolute top-[15px] right-[15px]"
        onClick={onClick}
      />
      <div className="tiktok-handler-modal-content-container">
        <div className="text-[#0E0D0D] uppercase head-text text-[18px] font-[700]">
          Creative request alert
        </div>
        <div className="text-[#0E0D0D] text-[14px] font-[700]">
          Kindly complete your profile first and add according handles into it.
        </div>
        <Link to={AuthRoutes.EditProfile} className="creator-button bg-black">
          <div className="">
            <span className="text-white">Profile</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TiktokHandlerAlertModal;
