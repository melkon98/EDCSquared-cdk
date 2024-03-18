import { FC, Fragment, useMemo } from 'react';
import { withProfile } from 'state/profileSteps';
import { ProfileProps } from 'utils';
import BrandBody from './brandBody';
import Meter from './meter';
import { NoDataFound } from './noData';
import BrandForm from './brandForm';

export const HomePage: FC<ProfileProps> = ({ profileState: { data } }) => {
  const brandExists = useMemo(() => {
    const brandItem = data?.brand?.items?.[0];
    const { name, description, toneVoice } = brandItem || {};
    return name || description || toneVoice ? brandItem : null;
  }, [data]);

  if (!data) return <Fragment key="no profie found" />;
  return (
    <div className="brand-dashboard__items brand-profile-items p-0">
      <div className="brand-dashboard__item title text-[#0E0D0D] uppercase head-text text-[16px] font-[700]">Brand identity</div>
      <div className="brand-dashboard__item border border-[#F5F1E8]">
        <Meter />
        {!brandExists && <NoDataFound />}
        {brandExists && <BrandBody data={brandExists} />}
      </div>
      <div className="brand-dashboard__item border border-[#F5F1E8]">
        <BrandForm />
      </div>
    </div>
  );
};

export default withProfile(HomePage);
