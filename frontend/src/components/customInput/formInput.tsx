import _ from 'lodash';
import * as S from './styles';
import { type InputHTMLAttributes } from 'react';
import {
  type FieldError,
  type FieldErrors,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from 'react-hook-form';

type Props<T extends FieldValues> = InputHTMLAttributes<HTMLInputElement> & {
  name: Path<T>;
  label?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

/// This is react-hook-form compatible version of Input
export default function Input<T extends FieldValues>({
  name,
  register,
  errors,
  className = 'mb-4',
  required,
  ...rest
}: Props<T>) {
  const error = _.get(errors, name) as FieldError | undefined;
  // TODO: enable me when labels are needed
  // const labelName = label ?? String(name);

  return (
    <S.FieldSet className={`flex flex-col ${className}`}>
      {/* {labelName && <S.InputLabel>{labelName}</S.InputLabel>} */}
      <S.Input
        id={name}
        className="w-full ring-0"
        type={rest.type}
        {...register(name, {
          valueAsNumber: rest.type === 'number',
          required,
        })}
        {...rest}
      />
      {error?.message && <S.ParagraphError>{error.message}</S.ParagraphError>}
    </S.FieldSet>
  );
}
