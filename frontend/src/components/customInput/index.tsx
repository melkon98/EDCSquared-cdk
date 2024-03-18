import { FC, Fragment } from 'react';
import { ShouldRender } from 'components';
import * as S from './styles';

import {
  defaultSignUpState,
  defaultLoginState,
  defaultSignUpError,
  defaultLoginError,
  defaultResetState,
  defaultResetError,
} from 'utils';

interface Handlers {
  state?:
    | typeof defaultSignUpState
    | typeof defaultLoginState
    | typeof defaultResetState;
  error?:
    | typeof defaultSignUpError
    | typeof defaultLoginError
    | typeof defaultResetError;
  updateState: (key: string, value: string) => void;
}
interface Props {
  type?: string;
  value?: string;
  placeholder?: string;
  errorVal?: string | null;
  handlers: Handlers;
  keyProp: string;
  label?: string;
  dataCy?: string
}

export const Input: FC<Props> = ({
  type,
  value,
  placeholder,
  errorVal,
  keyProp,
  handlers: { state, error, updateState },
  label,
  dataCy
}) => {
  return (
    <Fragment key="custom input">
      {label && <S.InputLabel>{label}</S.InputLabel>}
      <S.Input
        type={type || 'string'}
        placeholder={placeholder}
        value={state?.[keyProp] || value || ''}
        onChange={(e): void => updateState(keyProp, e.target.value)}
        data-cy={dataCy || ''}
      />
      <ShouldRender if={error?.[keyProp] || errorVal}>
        <S.ParagraphError>{error?.[keyProp] || errorVal}</S.ParagraphError>
      </ShouldRender>
    </Fragment>
  );
};

export { default as FormInput } from './formInput';
