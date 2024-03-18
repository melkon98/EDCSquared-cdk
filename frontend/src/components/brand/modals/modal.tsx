import { FullPageLoader } from 'components';
import { FC, useEffect, useMemo, useState } from 'react';
import { Modal } from 'react-bootstrap';
import * as S from '../styles';

interface Props {
  title: string;
  responses: Array<string>;
  loading: boolean;
  onCancel: () => void;
  onRefresh: () => void;
  onInsertion: (text: string) => void;
}
export const CustomModal: FC<Props> = ({
  onCancel,
  onInsertion,
  onRefresh,
  title,
  loading,
  responses,
}) => {
  const [selectedName, setSelectedName] = useState('');

  useEffect(onRefresh, []);

  useEffect(() => {
    if (loading) setSelectedName('');
  }, [loading]);

  const suggestionResponse = useMemo(() => {
    if (!responses.length)
      return <S.NoSuggestion>No Suggestions</S.NoSuggestion>;

    return (
      <S.SuggestionCanvas>
        {responses.map((name, index) => (
          <S.SuggestionBox
            key={index}
            className={name === selectedName ? 'active' : ''}
            onClick={(): void => setSelectedName(name)}
          >
            {name}
          </S.SuggestionBox>
        ))}
      </S.SuggestionCanvas>
    );
  }, [responses, selectedName]);

  return (
    <S.ModalWrapper
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show
      onHide={onCancel}
    >
      <Modal.Body>
        <S.ModalTitle>{title}</S.ModalTitle>
        <S.CrossIcon onClick={onCancel}>
          <img src={'/images/circle-cross.svg'} alt="cross-icon" />
        </S.CrossIcon>
        <S.ModalInputWrapper>
          {loading ? (
            <S.LoaderCanvas>
              <FullPageLoader />
            </S.LoaderCanvas>
          ) : (
            suggestionResponse
          )}
        </S.ModalInputWrapper>
        <S.ModalBtnWrapper>
          <S.OutlineBtn onClick={onRefresh} disabled={loading}>
            Refresh
          </S.OutlineBtn>
          <S.PrimaryBtn
            className="Poppins"
            onClick={(): void => onInsertion(selectedName)}
            disabled={!selectedName}
          >
            Done
          </S.PrimaryBtn>
        </S.ModalBtnWrapper>
      </Modal.Body>
    </S.ModalWrapper>
  );
};

export default CustomModal;
