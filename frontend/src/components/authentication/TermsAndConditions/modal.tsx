import Select from 'components/ui/select';
import * as S from '../styles/auth.styled';
import { ReactNode, useMemo, useState } from 'react';
import CountryList from 'utils/constants/ISOCodeCountry';

interface Props {
  handleClose: () => void;
  isOpen: boolean;
  content: string;
  type?: string;
  actionHandler?: (country: string) => void;
  actionLabel?: string;
  withOutLabel?: boolean;
  withCheckbox?: boolean;
  checkBoxText?: ReactNode | ReactNode[];
  title?: string;
}

export default function Modal({
  title,
  handleClose,
  isOpen,
  content,
  type,
  actionHandler,
  actionLabel,
  withOutLabel,
  withCheckbox,
  checkBoxText,
}: Props) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [country, setCountry] = useState('');
  const CountryOptions = useMemo(
    () =>
      CountryList.map(({ name: text, code: value, ...rest }) => ({
        text,
        value,
        ...rest,
      })),
    [CountryList]
  );
  if (!isOpen) return <></>;

  return (
    <S.ModalOverlay>
      <S.ModalContent
        $type={type || ''}
        className="gap-[36px] md:w-[705px] w-full"
        $withCheckBox={!!withCheckbox}
      >
        <S.ModalTopBar>
          <img src="/images/cross.svg" alt="cross icon" onClick={handleClose} />
        </S.ModalTopBar>
        {!withOutLabel ? (
          <img
            src={`/images/checkmark${type ? `-${type}` : ''}.svg`}
            alt="checkmark icon"
          />
        ) : null}
        {title ? <h1 className="sm:text-[24px] text-[16px]">{title}</h1> : null}
        <span
          className={`text-[#0E0D0D] ${
            title === 'Terms & conditions' ? 'px-[50px]' : 'px-[10px]'
          } head-text  font-[700]`}
        >
          {content}
        </span>
        {withCheckbox ? (
          <S.ModalCheckBox>
            <input
              className='md:mt-0 mt-[5px]'
              type="checkbox"
              onChange={(item) => setIsChecked(item.target.checked)}
              data-cy='terms-checkbox'
            />
            {checkBoxText}
          </S.ModalCheckBox>
        ) : null}
        <div className="w-full flex justify-start flex-col">
          <label className="mx-[50px] mb-3  head-text font-[700] text-[#0E0D0D]">
            Choose country
          </label>
          <select
            data-cy='country'
            value={country}
            onChange={(e) => {setCountry(e.target.value)
            }}
            className="create-brief-input select-input bg-[#f9fbfd] sm:w-[300px] mx-[50px] text-[#0E0D0D]"
          >
            <option hidden></option>
            {CountryList.map((item, index) => {
              return (
                <option value={item.code} key={index}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
        {actionLabel && (
          <button
            data-cy="submit-button"
            className="creator-button text-[16px]"
            disabled={country==='' || !isChecked}
            onClick={()=>{actionHandler && actionHandler(country)}}
          >
            {actionLabel}
          </button>
        )}
      </S.ModalContent>
    </S.ModalOverlay>
  );
}