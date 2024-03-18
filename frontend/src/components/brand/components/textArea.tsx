import React, { FC } from 'react';
import { SuggestionButton } from './suggestionButton';
import * as S from '../styles';
import classNames from 'classnames';

interface ISuggestionBtn {
  disabled: boolean;
  onClick: () => void;
  className?: string;
}
interface Props {
  value?: string;
  label?: string;
  editable?: boolean;
  suggestionBtn?: ISuggestionBtn;
  updateValue: (text: string) => void;
  onEditClick?: () => void;
}
export const TextArea: FC<Props> = ({
  value,
  updateValue,
  suggestionBtn,
  label,
  editable,
  onEditClick,
}) => {
  return (
    <S.TextAreaWrapper>
      <S.TextAreaCanvas className={suggestionBtn ? 'small_box' : ''}>
        <S.TextAreaLabel>{label}</S.TextAreaLabel>
        <S.TextAreaBox>
          <S.TextArea
            disabled={editable === false}
            value={value || ''}
            onChange={(e): void => updateValue(e.target.value)}
            rows={4}
            className={classNames({
              small_box: suggestionBtn,
              no_below_margin: label,
            })}
          />
          {editable === false && (
            <S.EditIcon onClick={onEditClick}>
              <img src="/images/edit-icon.svg" alt="edit-icon" />
            </S.EditIcon>
          )}
        </S.TextAreaBox>
      </S.TextAreaCanvas>
      {suggestionBtn && (
        <S.SuggestionBoxPanel className={suggestionBtn.className}>
          <SuggestionButton
            disableSuggestions={suggestionBtn.disabled}
            getSuggestions={suggestionBtn.onClick}
            hideButton={editable === false}
          />
        </S.SuggestionBoxPanel>
      )}
    </S.TextAreaWrapper>
  );
};
