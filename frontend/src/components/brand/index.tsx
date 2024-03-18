import { FC, Fragment, useContext, useEffect, useMemo, useState } from 'react';
import { CreateBrandProfileInput } from 'API';
import { withProfile } from 'state/profileSteps';
import { AuthRoutes, ProfileProps } from 'utils';
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepThree from './stepThree';
import {
  isMissionSuggestionDisable,
  isPillarSuggestionDisable,
  isTaglineSuggestionDisable,
} from 'components';
import { StepBelt } from './components';
import { BrandProps, withBrand } from 'state/brand';
import { TitleContext } from 'state/auth';
import { TopBordered, TopHeading } from './styles';

export const BrandSteps: FC<ProfileProps & BrandProps> = ({
  profileState: { data },
  updateData,
  data: updatedDataRes,
}) => {
  const { setTitle } = useContext(TitleContext);
  const [step, updateStep] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const [brandData, setBrandData] = useState<CreateBrandProfileInput>(
    data?.brand?.items?.[0] || {}
  );

  const goToNextStep = (): void => {
    updateData(brandData);
    if (step < 2) updateStep(step + 1);
    else setRedirect(true);
  };

  const goToPrevStep = (): void => {
    if (step > 0) {
      updateStep(step - 1);
      updateData(brandData);
    }
  };
  const updateBrandData = (newBrandData: CreateBrandProfileInput): void => {
    setBrandData({ ...brandData, ...newBrandData });
  };
  const updateStepNumber = (stp: number): void => {
    let newStep = step;
    if (stp > step) {
      if (
        (stp === 1 && !isPillarSuggestionDisable(brandData)) ||
        (stp === 2 && !isMissionSuggestionDisable(brandData))
      ) {
        newStep = stp;
      }
    } else newStep = stp;
    updateData(brandData);
    updateStep(newStep);
  };

  useEffect(() => {
    if (redirect && updatedDataRes)
      window.location.href = `${window.location.origin}${AuthRoutes.Redirector}`;
  }, [updatedDataRes]);

  useEffect(() => setBrandData(data?.brand?.items?.[0] || {}), [data]);
  useEffect(() => {
    setTitle(`Brand Profile - Step ${step + 1}`);
  }, [step]);

  const nextStepDisabled = useMemo(() => {
    if (step === 0) return isPillarSuggestionDisable(brandData);
    if (step === 1) return isMissionSuggestionDisable(brandData);
    if (step === 2) return isTaglineSuggestionDisable(brandData);
    return false;
  }, [brandData, step]);

  return (
    <Fragment key="brand steps">
      <TopHeading>Brand identity - Step {step + 1}</TopHeading>

      <TopBordered>
        {step === 0 && <StepOne data={brandData} onUpdate={updateBrandData} />}
        {step === 1 && <StepTwo data={brandData} onUpdate={updateBrandData} />}
        {step === 2 && (
          <StepThree data={brandData} onUpdate={updateBrandData} />
        )}

        <StepBelt
          step={step}
          onNext={goToNextStep}
          onPrev={step > 0 ? goToPrevStep : undefined}
          disabled={nextStepDisabled}
          goToStep={updateStepNumber}
        />
      </TopBordered>
    </Fragment>
  );
};

export default withProfile(withBrand(BrandSteps));
