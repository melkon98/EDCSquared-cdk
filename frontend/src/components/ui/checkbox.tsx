import * as S from './checkbox.styled';
import { type InputHTMLAttributes } from 'react';
import {
  useController,
  UseControllerProps,
  type FieldValues,
  type Path,
} from 'react-hook-form';

type Props<T extends FieldValues> = UseControllerProps<T> &
  InputHTMLAttributes<HTMLInputElement> & {
    name: Path<T>;
  };

// This is react-hook-form compatible version of Checkbox
// TODO: this should not be a controlled component, it's a fucking checkbox.
export default function Checkbox<T extends FieldValues>(props: Props<T>) {
  const {
    field: { value, onChange },
  } = useController(props);

  return (
    <S.CheckBoxWrapper>
      <S.CheckBoxlabel className="container">
        <S.CheckInput
          type="checkbox"
          checked={value}
          onChange={onChange}
          {...props}
        />
        <S.CheckBoxTick className={value ? 'tickMark' : ''} />
      </S.CheckBoxlabel>
    </S.CheckBoxWrapper>
  );
}
