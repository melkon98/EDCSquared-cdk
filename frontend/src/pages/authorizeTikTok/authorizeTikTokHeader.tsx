import { FC } from 'react';
import './authorizeTikTok.css';

interface Props {
  title: string;
  loading?: boolean;
  onCross: () => void;
}
export const AuthorizeTikTokHeader: FC<Props> = ({ title, onCross }) => {  
  return (
    <div className="tik-tok-header">
      <div className='flex sm:items-center items-start'>
        <img src="menu-icons/menu-icon-4.svg" className='mr-[20px]' />
      <div className="text-[#0E0D0D] uppercase head-text text-[16px] font-[700] sm:leading-[1px] leading-normal">{title}</div>
      </div>
      
      <img
        src="/images/modal-cross.svg"
        className="close-icon"
        onClick={()=>{onCross()}}
      />
    </div>
  );
};

export default AuthorizeTikTokHeader;
