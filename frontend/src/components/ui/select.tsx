import _ from 'lodash';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment, type SelectHTMLAttributes, useMemo } from 'react';
import {
  type FieldError,
  type FieldErrors,
  type FieldValues,
  type Path,
  useController,
  type UseControllerProps,
} from 'react-hook-form';
import Label from './label';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';

export interface Option {
  text: string;
  value: string;
}

type Props<T extends FieldValues> = UseControllerProps<T> &
  SelectHTMLAttributes<HTMLButtonElement> & {
    name: Path<T>;
    label?: string;
    options: Option[];
    errors?: FieldErrors<T>;
    isLoading?: boolean;
    disabled?: boolean;
    dataCy?: string;
  };

function Select<T extends FieldValues>(props: Props<T>) {
  const { name, label, errors, className, options, disabled, dataCy } = props;
  const {
    field: { value, onChange },
  } = useController(props);

  const error = _.get(errors, name) as FieldError | undefined;
  const labelName = label ?? String(name);

  const selectedOption = useMemo(() => {
    return _.find(options, { value }) as Option | undefined;
  }, [options, value]);

  return (
    <Listbox
      name={name}
      value={value}
      onChange={onChange}
      data-cy={dataCy || ''}
      disabled={disabled}
      className={`flex flex-col relative mb-4 ${className}`}
      as="fieldset"
    >
      {labelName && <Label name={labelName} isLoading={props.isLoading} />}
      <Listbox.Button
        id={name}
        className={`
          w-full rounded-lg h-[38px] border-[black] border-[1px] bg-white text-gray-400 p-5 text-start disabled:cursor-not-allowed
        `}
      >
        <ChevronUpDownIcon
          className={`absolute h-6 right-0 mr-2 sm:top-[46px] top-[42px]`}
        />
        <div
          className={`absolute sm:top-[46px] top-[42px] overflow-hidden whitespace-nowrap w-[75%] ${selectedOption?.text && 'text-[#1D1C1C]'}`}
        >
          {selectedOption?.text || props.placeholder}
        </div>
      </Listbox.Button>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options
          className="
          bg-[#f9fbfd] text-[#8fa4a9]
          py-1 rounded-md backdrop-blur absolute bottom-0
          translate-y-full w-full z-[1000] select-content
        "
        >
          {_.map(options, (option) => (
            <Listbox.Option
              value={option.value}
              data-cy={`${option.value.replaceAll(' ', '-')}`}
              key={option.value}
              className={({ active }) =>
                `py-1 px-2 relative flex cursor-pointer ${active && 'bg-primary text-white'
                }`
              }
            >
              {option.text}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
      {error?.message && (
        <p className="text-red-400 text-sm mx-3 mt-1">{error.message}</p>
      )}
    </Listbox>
  );
}

export default Select;
