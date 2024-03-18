import { FC, useState } from 'react';
import { CreateBrandProfileInput, GPT_PROMPT } from 'API';
import { createBrand } from 'utils';
import { TextArea, isPillarSuggestionDisable } from 'components';
import { Field } from './components';
import Modal from './modals';
import * as S from './styles';
import { times } from 'lodash';

interface Props {
  data: CreateBrandProfileInput;
  onUpdate: (data: CreateBrandProfileInput) => void;
}
export const StepTwo: FC<Props> = ({ data, onUpdate }) => {
  const { pillars } = data;

  const [showSuggestion, setShowSuggestion] = useState(false);
  const [activePillar, setActivePillar] = useState(0);

  const setPillars = (text: string, index: number): void => {
    const newValues = [...(pillars || ['', '', '', ''])];
    newValues[index] = text;
    onUpdate({ pillars: [...newValues] });
  };
  const toggleSuggestionBox = (): void => setShowSuggestion(!showSuggestion);
  const insertPillarDiscription = (text: string): void => {
    setPillars(text, activePillar);
    toggleSuggestionBox();
  };
  const filterPillars = (res: Array<string>): Array<string> =>
    pillars ? res.filter((e) => !pillars.find((s) => s === e)) : res;

  return (
    <S.TopWrapper>
      <Field {...createBrand.pillars} />
      {times(4, (i) => (
        <TextArea
          key={i}
          value={pillars?.[i] || ''}
          updateValue={(text: string): void => setPillars(text, i)}
          label={`Brand communication pillar ${i + 1}`}
          editable={activePillar === i}
          onEditClick={(): void => setActivePillar(i)}
          suggestionBtn={{
            disabled: isPillarSuggestionDisable(data),
            className: 'insertMargin',
            onClick: toggleSuggestionBox,
          }}
        />
      ))}

      {showSuggestion && (
        <Modal
          data={data}
          title="Brand pillar suggestions"
          prompType={GPT_PROMPT.BRAND_PILLARS}
          onCancel={toggleSuggestionBox}
          onInsertion={insertPillarDiscription}
          filterResponse={filterPillars}
        />
      )}
    </S.TopWrapper>
  );
};

export default StepTwo;
