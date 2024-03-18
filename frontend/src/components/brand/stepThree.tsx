import { FC, useState } from 'react';
import { CreateBrandProfileInput, GPT_PROMPT } from 'API';
import { createBrand } from 'utils';
import {
  TextArea,
  isMissionSuggestionDisable,
  isTaglineSuggestionDisable,
} from 'components';
import { Field, SuggestedInput } from './components';
import Modal from './modals';
import * as S from './styles';

interface Props {
  data: CreateBrandProfileInput;
  onUpdate: (data: CreateBrandProfileInput) => void;
}
export const StepThree: FC<Props> = ({ data, onUpdate }) => {
  const { internalMission, strapLine } = data;
  const [showMissionSuggestion, setShowMissionSuggestion] = useState(false);
  const [showStrapSuggestion, setShowStrapSuggestion] = useState(false);

  const setMission = (text: string): void =>
    onUpdate({ internalMission: text });
  const setStrapLine = (text: string): void => onUpdate({ strapLine: text });

  const toggleMissionSuggestionBox = (): void =>
    setShowMissionSuggestion(!showMissionSuggestion);
  const toggleStrapSuggestionBox = (): void =>
    setShowStrapSuggestion(!showStrapSuggestion);

  const insertMissionStatement = (text: string): void => {
    setMission(text);
    toggleMissionSuggestionBox();
  };

  const insertStrapLine = (text: string): void => {
    setStrapLine(text);
    toggleStrapSuggestionBox();
  };

  return (
    <S.TopWrapper>
      <Field {...createBrand.missionStatement} />
      <TextArea
        value={internalMission || ''}
        updateValue={setMission}
        suggestionBtn={{
          disabled: isMissionSuggestionDisable(data),
          onClick: toggleMissionSuggestionBox,
        }}
      />

      <Field {...createBrand.strapLine} />
      <SuggestedInput
        value={strapLine || ''}
        setValue={setStrapLine}
        getSuggestions={toggleStrapSuggestionBox}
        disableSuggestions={isTaglineSuggestionDisable(data)}
      />

      {showMissionSuggestion && (
        <Modal
          title="Misson statement suggestions"
          data={data}
          prompType={GPT_PROMPT.BRAND_MISSION_STATEMENT}
          onCancel={toggleMissionSuggestionBox}
          onInsertion={insertMissionStatement}
        />
      )}
      {showStrapSuggestion && (
        <Modal
          title="Tagline suggestions"
          data={data}
          prompType={GPT_PROMPT.BRAND_TAGLINE_STATEMENT}
          onCancel={toggleStrapSuggestionBox}
          onInsertion={insertStrapLine}
        />
      )}
    </S.TopWrapper>
  );
};

export default StepThree;
