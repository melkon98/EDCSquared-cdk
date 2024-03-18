import { FC, useState } from 'react';
import { CreateBrandProfileInput, GPT_PROMPT } from 'API';
import { createBrand } from 'utils';
import { TextArea, isNameSuggestionDisable } from 'components';
import { Field, SuggestedInput, ToneOfVoice } from './components';
import Modal from './modals';
import * as S from './styles';

interface Props {
  data: CreateBrandProfileInput;
  onUpdate: (data: CreateBrandProfileInput) => void;
}
export const StepOne: FC<Props> = ({ data, onUpdate }) => {
  const { description, toneVoice, name } = data;
  const [showSuggestion, setShowSuggestion] = useState(false);

  const setDescript = (text: string): void => onUpdate({ description: text });
  const setTonVoice = (text: string): void => onUpdate({ toneVoice: [text] });
  const setName = (text: string): void => onUpdate({ name: text });

  const toggleSuggestionBox = (): void => setShowSuggestion(!showSuggestion);
  const insertBrandName = (text: string): void => {
    setName(text);
    toggleSuggestionBox();
  };

  return (
    <S.TopWrapper>
      <Field {...createBrand.description} />
      <TextArea value={description || ''} updateValue={setDescript} />
      <Field {...createBrand.tonOfVoice} />
      <ToneOfVoice currentTone={toneVoice?.[0]} onSelect={setTonVoice} />
      <Field {...createBrand.brandName} />
      <SuggestedInput
        small
        placeholder="Enter Brand Name"
        disableSuggestions={isNameSuggestionDisable(data)}
        value={name || ''}
        setValue={setName}
        getSuggestions={toggleSuggestionBox}
      />
      {showSuggestion && (
        <Modal
          data={data}
          title="Brand name suggestions"
          prompType={GPT_PROMPT.BRAND_NAME}
          onCancel={toggleSuggestionBox}
          onInsertion={insertBrandName}
        />
      )}
    </S.TopWrapper>
  );
};

export default StepOne;
