import { Auth } from 'aws-amplify';
import { AuthRoutes, defaultResetPassState, ProfileProps } from 'utils';
import { FC, useEffect, useState } from 'react';
import {
  IChangePassword,
  IChangePasswordError,
  withProfile,
} from 'state/profileSteps';
import {
  validatePassword,
  validateConfirmPassword,
  validateEmail,
} from '../../state/auth';
import { IconLoader, ShouldRender } from 'components';
import classNames from 'classnames';
import '../editProfile/creatorProfile.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import VerificationInput from 'react-verification-input';

const ChangeEmail: FC<ProfileProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState({ message: '', value: false });
  const [email, setEmail] = useState<string>('');
  const [emailSended, setEmailSended] = useState<boolean>(false);
  const [formError, setFormError] = useState({ userEmail: '' });

  const updateState = (key: string): void => {
    if (isSuccess.message) {
      setIsSuccess({ message: '', value: false });
    }
    setFormError((prev) => ({ ...prev, [key]: null }));
  };

  const validateProfileForm = (): boolean => {
    const userEmail = validateEmail(email);
    if (userEmail) {
      setFormError({ userEmail });
      return false;
    }
    return true;
  };

  async function updateUserEmail() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, {
        email,
      });
      setEmailSended(true)
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      setIsSuccess({ message: err.message, value: false });
    }
  }

  async function verifyEmailValidationCode(code: string) {
    try {
      await Auth.verifyCurrentUserAttributeSubmit('email', code);
      setEmailSended(false)
      setIsSuccess({ message: 'Your email successfully changed', value: true });
    } catch (err) {
      setIsSuccess({ message: err.message, value: false });
    }
  }

  const submitProfile = () => {
    if (!isLoading && validateProfileForm()) {
      setIsLoading(true)
      updateUserEmail();
    }
  };

  const sendVerificationCode = (code: string) => {
    verifyEmailValidationCode(code);
  };

  return (
    <div className="brand-dashboard__items h-full user-profile-items">
      <div className="brand-dashboard__item">
        <div className="brand-dashboard__profile">
          <div className="brand-dashboard__profile-title d-flex justify-between items-center">
            Change Email{' '}
            <Link to={AuthRoutes.EditProfile} className="back-link">
              <img src="images/arrow-down.svg" alt="" />
            </Link>
          </div>
          <div className="brand-dashboard__profile-inputs">
            <div className="brand-dashboard__profile-group">
              {!emailSended ? (
                <>
                  <div className="brand-dashboard__profile-label">
                    New Email
                  </div>
                  <input
                    className="brand-dashboard__profile-input"
                    type="email"
                    value={email}
                    onChange={(e): void => {
                      setEmail(e.target.value);
                      updateState('userEmail');
                    }}
                  />
                </>
              ) : (
                <Wrapper>
                  <h6 className="mb-4">
                    The verification code is sent to your email. Please, enter
                    the code.
                  </h6>
                  <VerificationInput
                    classNames={{
                      container: 'container',
                      character: 'character',
                      characterInactive: 'character--inactive',
                      characterSelected: 'character--selected',
                    }}
                    onComplete={(code) => sendVerificationCode(code)}
                    onChange={()=>{if(isSuccess.message) setIsSuccess({message:'', value: false})}}
                  />
                </Wrapper>
              )}

              <ShouldRender if={formError.userEmail}>
                <p className="error-text">{formError.userEmail}</p>
              </ShouldRender>
              <ShouldRender if={isSuccess.message}>
                <p
                  className={`text-center ${
                    isSuccess.value ? 'success-text' : 'error-text'
                  }`}
                >
                  {isSuccess.message}
                </p>
              </ShouldRender>
            </div>
          </div>
          {!emailSended ? (
            <div className="save-button-container">
              <button
                className="brand-dashboard__profile-button d-flex justify-center items-center"
                onClick={submitProfile}
              >
                <span className={classNames({ loading: isLoading })}>
                  Change Email
                </span>
                {isLoading && <IconLoader color="#005f73" />}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 26px;
  flex-direction: column;
  align-items: center;
`;

export default ChangeEmail;
