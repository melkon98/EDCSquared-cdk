import { FC } from 'react';
import { Dropdown } from 'react-bootstrap';
import { ToneOptions } from 'utils';
import * as S from '../styles';

interface Props {
  currentTone?: string | null;
  onSelect: (text: string) => void;
}

export const ToneOfVoice: FC<Props> = ({ currentTone, onSelect }) => {
  return (
    <S.DropdownTag className={currentTone ? 'option__selected' : ''}>
      <Dropdown.Toggle variant="success" id="dropdown-for-salary">
        <span>{currentTone || 'Select brand tone of voice'}</span>
        <S.IconDown>
          <img src="/images/icon-chevron-down.svg" alt="chevron icon" />
        </S.IconDown>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {ToneOptions.map((text) => (
          <Dropdown.Item
            className={currentTone === text ? 'active' : ''}
            onClick={(): void => onSelect(text)}
            key={`${text}toneOfVoice`}
          >
            {text}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </S.DropdownTag>
  );
};

export default ToneOfVoice;
