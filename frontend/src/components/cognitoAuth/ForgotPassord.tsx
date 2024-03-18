import { FC } from 'react';
import styled from 'styled-components';
import Input from 'components/input/Input';
import VerificationInput from 'react-verification-input';

type ForgotPassProps = {
  callback: (code: string) => void;
  register: any;
  emailSended: boolean;
};

export const CognitoForgotPassword: FC<ForgotPassProps> = ({
  callback,
  register,
  emailSended,
}) => {

  const validationReq = {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Length must be 8 or more',
    }
  }
  return (
    <div>
      {emailSended ? (
        <>
          <IputWrap>
          <Input {...{ type: 'password', placeholder: 'New password', register, validationReq }} />
          </IputWrap>
          <Wrapper>
            <VerificationInput
              classNames={{
                container: 'container',
                character: 'character',
                characterInactive: 'character--inactive',
                characterSelected: 'character--selected',
              }}
              onComplete={(code) => callback(code)}
            />
          </Wrapper>
        </>
      ) : (
        <IputWrap>
          <Input
            {...{ type: 'email', placeholder: 'Email address', register, validationReq: {required: 'Email is required' }}}
          />
        </IputWrap>
      )}
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 26px;
`;

const IputWrap = styled.div`
  position: relative;
  margin-bottom: 26px;
`;

export default CognitoForgotPassword;
