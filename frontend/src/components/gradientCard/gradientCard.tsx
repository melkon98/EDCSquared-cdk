import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
type Props = {
  bg?: string;
  boxUrl?: string;
};
export default function GradientCard({
  children,
  bg,
  boxUrl,
}: PropsWithChildren & Props) {
  const navigate = useNavigate();

  return (
    <div
      className={`${bg ? 'border border-[#00B1B5]' : 'gradient'
        } rounded-[16px] h-[120px] text-white flex relative card-container sm:w-full w-[280px]`}
    >
      <div className="absolute bg-cover inset-0 mix-blend-difference opacity-50" />
      <div className="px-[30px] pt-[26px] w-full relative card-content flex flex-col justify-start">
        <div
          className="absolute inset-0 mix-blend-color-dodge z-[-1]"
          onClick={() => {
            boxUrl ? navigate(boxUrl) : '';
          }}
        />
        {children}
      </div>
    </div>
  );
}
