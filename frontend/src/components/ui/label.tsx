import { type FC } from 'react';
import _ from 'lodash';
import Spinner from './spinner';

interface Props {
  name: string;
  required?: boolean;
  isLoading?: boolean;
}

const Label: FC<Props> = ({ name, isLoading = false, required = false }) => {
  return (
    <label
      className="profile-label md:text-[16px] text-[13px] flex justify-between"
      htmlFor={name}
    >
      <span>
        {name + ' ' + (required ? '*' : '')}
      </span>
      <div>{isLoading && <Spinner className="w-4 h-4" />}</div>
    </label>
  );
};

export default Label;
