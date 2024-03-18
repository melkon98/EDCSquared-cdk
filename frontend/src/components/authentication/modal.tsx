import * as S from './styles/auth.styled';
import { ReactNode, useState } from 'react';

interface Props {
  handleClose: () => void;
  isOpen: boolean;
  content: string;
  type?: string;
  actionHandler?: () => void;
  actionLabel?: string;
  withOutLabel?: boolean;
  withCheckbox?: boolean;
  checkBoxText?: ReactNode | ReactNode[];
  title?: string;
  dataCy?: string;
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
  dataCy,
}: Props) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  if (!isOpen) return <></>;

  return (
    <S.ModalOverlay className='z-[99999]'>
      <S.ModalContent
        className={`${!actionLabel && withOutLabel ? 'gap-0' : ''}`}
        $type={type || ''}
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
        {title ? <h1>{title}</h1> : null}
        <span
          className={`text-[#0E0D0D] ${
            title === 'Terms & conditions' ? 'px-[50px]' : 'px-[10px]'
          }  head-text  font-[700]`}
        >
          {content}
        </span>
        {withCheckbox ? (
          <S.ModalCheckBox>
            <input
              type="checkbox"
              onChange={(item) => setIsChecked(item.target.checked)}
            />
            {checkBoxText}
          </S.ModalCheckBox>
        ) : null}
        {actionLabel && (
          <button
            className="creator-button text-[16px]"
            disabled={withCheckbox ? !isChecked : false}
            onClick={actionHandler}
            data-cy={dataCy || ''}
          >
            {actionLabel}
          </button>
        )}
      </S.ModalContent>
    </S.ModalOverlay>
  );
}
