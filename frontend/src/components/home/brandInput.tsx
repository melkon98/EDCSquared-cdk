import { FC } from 'react';
import { IBrandFormState } from 'state/brand';

interface Props {
  title: string;
  keyProp: string;
  formState: IBrandFormState;
  onChange: (key: string, value: string) => void;
}
export const BrandInput: FC<Props> = ({
  title,
  keyProp,
  formState,
  onChange,
}) => {
  return (
    <div className="brand-dashboard__form-group">
      <div className="profile-label">{title}</div>
      <input
        value={formState[keyProp]}
        type="text"
        className="profile-input"
        onChange={(e): void => onChange(keyProp, e.target.value)}
      />
    </div>
  );
};

export default BrandInput;
