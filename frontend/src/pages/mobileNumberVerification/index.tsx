import { Auth } from 'aws-amplify';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VerificationInput from 'react-verification-input';
import {
  AuthRoutes
} from 'utils';
import styled from 'styled-components';

export default function MobileNumberVerification() {
  const navigate = useNavigate();

  const sendVerificationCode = (code) => {
    navigate(AuthRoutes.EditProfile)
  }
  const getUser = async () => {
    const user = await Auth.currentAuthenticatedUser();
    if (user.phone_number_verified) {
      navigate(AuthRoutes.EditProfile)
    }
  }

  useEffect(() => { getUser() }, [])
  return (
    <div className='h-full flex justify-center items-center'>
      <Wrapper>
        <h3 className="mb-4 text-[20px]">
          The verification code is sent to your mobile number. Please, enter the code.
        </h3>
        <VerificationInput
          classNames={{
            container: 'container',
            character: 'character',
            characterInactive: 'character--inactive',
            characterSelected: 'character--selected',
          }}
          onComplete={(code) => sendVerificationCode(code)}
        />
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 26px;
  flex-direction: column;
  align-items: center;
`;
