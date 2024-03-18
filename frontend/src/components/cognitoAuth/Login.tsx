import { FC } from 'react';
import styled from 'styled-components';
import AwsConfig from '../../hooks/apollo/awsConfig';
import { Amplify } from 'aws-amplify';
import VerificationInput from 'react-verification-input';
import { Input } from 'components/input/Input';
import { IconLoader } from 'components/loader';

Amplify.configure(AwsConfig);

export type SignInParameters = {
  email: string;
  password: string;
};

type LoginProps = {
  callback: (code: string) => void;
  register: any;
  emailSended: boolean;
  loading: boolean;
};

export const CognitoLogin: FC<LoginProps> = ({
  register,
  callback,
  emailSended,
  loading,
}) => {
  const validationReq = {
    required: 'Password is required',
  };

  return (
    <>
      {!emailSended ? (
        <>
          {' '}
          <IputWrap>
            <Input
              {...{
                type: 'email',
                placeholder: 'Email address',
                dataCy: 'emailAddress',
                register,
                validationReq: { required: 'Email is required' },
              }}
            />
          </IputWrap>
          <IputWrap1>
            <Input
              {...{
                type: 'password',
                placeholder: 'Password',
                dataCy: 'password',
                register,
                validationReq,
              }}
            />
          </IputWrap1>
        </>
      ) : (
        <Wrapper>
          <h6 className='mb-4'>
            The verification code is sent to your email. Please, enter the code.
          </h6>
          <VerificationInput
            classNames={{
              container: 'container',
              character: 'character',
              characterInactive: 'character--inactive',
              characterSelected: 'character--selected',
            }}
            onComplete={(code) => callback(code)}
          />
           {loading && (
            <LoaderContent>
              <IconLoader />
            </LoaderContent>
          )}
        </Wrapper>
      )}
    </>
  );
};

const IputWrap = styled.div`
  position: relative;
  margin-bottom: 26px;
`;

const IputWrap1 = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 26px;
  flex-direction: column;
  align-items: center;
`;

const SignupForm = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const LoaderContent = styled.div`
  display: flex;
  widht: 100%;
  justify-content: center;
  align-items: center;
  span {
    border-color: black #383232 #707070;
    height: 25px;
    width: 25px;
    margin-top: 35px;
  }
`;

export default CognitoLogin;
