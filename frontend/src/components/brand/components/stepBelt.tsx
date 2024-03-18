import { FC, Fragment } from 'react';
import * as S from '../styles';

interface Props {
  step: number;
  disabled: boolean;
  goToStep: (step: number) => void;
  onNext: () => void;
  onPrev?: () => void;
}
export const StepBelt: FC<Props> = ({
  step,
  onNext,
  onPrev,
  disabled,
  goToStep,
}) => {
  const getStepWithBar = (e: number, showBar?: boolean): JSX.Element => (
    <Fragment key={`step number and bar ${e}`}>
      <S.StepNumber
        onClick={(): void => goToStep(e)}
        className={step >= e ? 'active' : ''}
      >
        {e + 1}
      </S.StepNumber>
      {showBar && (
        <S.StepBar>
          {step >= e && <span className={step > e ? 'active' : ''} />}
        </S.StepBar>
      )}
    </Fragment>
  );

  return (
    <S.StepBeltWrapper>
      <S.StepBelt>
        {getStepWithBar(0, true)}
        {getStepWithBar(1, true)}
        {getStepWithBar(2)}
      </S.StepBelt>
      <S.StepBtnHandler>
        {onPrev && <S.PrimaryBtn onClick={onPrev}>Back</S.PrimaryBtn>}
        <S.OutlineBtn className="Poppins" onClick={onNext} disabled={disabled}>
          Next
        </S.OutlineBtn>
      </S.StepBtnHandler>
    </S.StepBeltWrapper>
  );
};
