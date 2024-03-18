import { FC } from 'react';
import styled from 'styled-components';
import AwsConfig from '../../hooks/apollo/awsConfig';
import { Amplify } from 'aws-amplify';
import { UseFormRegister } from 'react-hook-form';
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

export const CognitoSignup: FC<LoginProps> = ({
  register,
  callback,
  loading,
  emailSended,
}) => {
  const validationReq = {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Length must be 8 or more',
    },
  };

  return (
    <>
      {!emailSended ? (
        <>
          {' '}
          {/* <SignupForm>
            
            <Input
              {...{
                type: 'text',
                placeholder: 'Surname',
                valueName: 'surname',
                register,
                validationReq: { required: 'Surname is required' },
              }}
            />
          </SignupForm> */}
          <InputWrap1>
          <Input
              {...{
                type: 'text',
                placeholder: 'Full name',
                valueName: 'fullname',
                register,
                validationReq: { required: 'Full name is required' },
              }}
            /></InputWrap1>
          <InputWrap1>
            <Input
              {...{
                type: 'email',
                placeholder: 'Email address',
                register,
                validationReq: { required: 'Email is required' },
              }}
            />
          </InputWrap1>
          <InputWrap1>
            <Input
              {...{
                type: 'password',
                placeholder: 'Password',
                register,
                validationReq,
              }}
            />
          </InputWrap1>
        </>
      ) : (
        <Wrapper>
          <h6 className="mb-4">
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

const InputWrap1 = styled.div`
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
  margin-bottom: 26px;
  input {
    width: 47%;
  }
  @media screen and (max-width: 522px) {
    flex-direction: column;
    margin-bottom: 0px;
    input {
      width: 100%;
      margin-bottom: 26px;
    }
  }
`;

const LoaderContent = styled.div`
  display: flex;
  widht: 100%;
  justify-content: center;
  align-items: center;
  span {
    border-color: black black transparent !important;
    height: 25px;
    width: 25px;
    margin-top: 35px;
  }
`;

export default CognitoSignup;
