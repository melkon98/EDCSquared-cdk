import { FC, useState } from 'react';
import { Toast } from 'react-bootstrap';
import { toastDelayTime } from 'utils';
import * as Styled from './styles';

type Props = {
  title: string;
  message: string;
  id?: number;
  removeError?: (id: number) => void;
};

export const ToastDisplay: FC<Props> = (props) => {
  const { title, message, id, removeError } = props;
  const [show, setShow] = useState(true);

  const handleClick = (): void => {
    setShow(!show);
    if ((id || id === 0) && removeError) removeError(id);
  };

  return (
    <Styled.ToastContainer>
      <Toast
        onClose={handleClick}
        show={show}
        delay={toastDelayTime}
        autohide
        animation={false}
      >
        <Toast.Header>
          <Styled.TextContainer>{title}</Styled.TextContainer>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </Styled.ToastContainer>
  );
};

export default ToastDisplay;
