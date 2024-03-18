import './creativeDetailsCard.css';

interface Props {
  campaign: number | string;
  campaignHeader: string;
}

export default function CreativeDetailsCard({
  campaign,
  campaignHeader,
}: Props) {
  return (
    <div className="gradient rounded-[16px] text-white p-5 flex relative overflow-hidden card-container h-[140px]">
      <div className="creative-title-container">
        <div className="creative-detail-title text-white">{campaignHeader}</div>
      </div>
      <div className="creative-detail-description text-white">{campaign}</div>
    </div>
  );
}
