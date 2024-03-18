import { InputHTMLAttributes } from 'react';
import { Switch as SwitchBase } from '@headlessui/react';
import {
  type FieldValues,
  type Path,
  useController,
  type UseControllerProps,
} from 'react-hook-form';
import Label from './label';

type Props<T extends FieldValues> = UseControllerProps<T> &
  InputHTMLAttributes<HTMLInputElement> & {
    name: Path<T>;
    label?: string;
    disabled?: boolean;
    dataCy?: string;
  };

export default function Routes<T extends FieldValues>(props: Props<T>) {
  const {
    field: { value, onChange },
  } = useController(props);

  const labelName = props.label ?? String(props.name);

  return (
    <fieldset className={`${props.className}`}>
      {labelName && <Label name={labelName} required={props.required} />}
      <SwitchBase
        checked={value}
        onChange={onChange}
        disabled={props.disabled && props.disabled}
        data-cy={props.dataCy || ''}
        className={`${value ? 'bg-[#3D636B]' : 'bg-gray-300'
          } relative inline-flex h-[20px] w-[37px] items-center rounded-full outline-none disabled:bg-gray-300`}
      >
        <span className="sr-only">Enable notifications</span>
        <span
          className={`${value ? 'translate-x-[21px]' : 'translate-x-1'
            } inline-block h-[14px] w-[14px] transform rounded-full bg-white transition`}
        />
      </SwitchBase>
    </fieldset>
  );
}
