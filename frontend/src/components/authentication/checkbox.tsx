import React, { FC, useState } from 'react';
import * as S from './styles';

export const Checkbox: FC = () => {
  const [checked, setChecked] = useState(false);

  return (
    <S.CheckBoxWrapper>
      <S.CheckBoxlabel className="container">
        <S.CheckInput
          checked={checked}
          onChange={(): void => setChecked(!checked)}
          onClick={(): void => setChecked(!checked)}
        />
        <S.CheckBoxTick className={checked ? 'tickMark' : ''} />
      </S.CheckBoxlabel>
    </S.CheckBoxWrapper>
  );
};

export default Checkbox;
