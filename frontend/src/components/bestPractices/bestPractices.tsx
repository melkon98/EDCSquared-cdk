import './bestPractices.css';
import { FC, Fragment, useEffect, useState } from 'react';
import { getActiveBestPractice } from 'hooks';
import { BestPractices as IBestPractice } from 'API';
import SinglePracticeMini from './singlePracticeMini';
import { IconLoader } from 'components/loader';

export const BestPractices: FC = () => {
  const { getActivePractice, data, loading } = getActiveBestPractice();
  const [practice, setPractice] = useState<IBestPractice>();

  useEffect(() => {
    getActivePractice({ variables: { active: 'true' } });
  }, []);

  useEffect(() => {
    if (!loading && data?.[0]) setPractice(data[0]);
  }, [data, loading]);

  if (practice) return <SinglePracticeMini practice={practice} showDots />;
  return (
    <div className="creator-dashboard__item border pt-[20px] border-black">
      <div className="brand-dashboard__top">
        <div className="brand-dashboard__top-title text-[#0E0D0D] head-text font-[700]">
          BEST PRACTICES
        </div>
      </div>
      <div className="loader-content h-[200px]">
        <IconLoader />
      </div>
    </div>
  );
};

export default BestPractices;
