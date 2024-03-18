import { ButtonHTMLAttributes } from 'react';
import Spinner from './spinner';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  variant?: string;
  className?: string;
  dataCy?: string
};

export default function Button({
  children,
  isLoading,
  variant = 'primary',
  dataCy,
  className = '',
  ...rest
}: Props) {
  return (
    <button
      type="submit"
      data-cy={dataCy || ''}
      className={`
        px-[10px] min-w-[100px] py-3 w-fit rounded-full
        flex items-center justify-center relative sm:mb-0
        whitespace-nowrap font-bold text-md
        disabled:cursor-not-allowed
        disabled:bg-gray-400
        text-white
        ${isLoading && 'cursor-progress'}
        ${variant === 'primary' && 'bg-primary'}
        ${variant === 'secondary' && 'bg-secondary'}
        ${variant === 'danger' &&`bg-[#941b12ce]`}
        ${className}
      `}
      {...rest}
    >
      {children}
      {isLoading && (
        <Spinner className="h-full w-6 aspect-square right-2 absolute top-0 bottom-0" />
      )}
    </button>
  );
}
