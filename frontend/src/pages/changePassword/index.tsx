import { Auth } from 'aws-amplify';
import { AuthRoutes, defaultResetPassState, ProfileProps } from 'utils';
import { FC, useEffect, useState } from 'react';
import {
  IChangePassword,
  IChangePasswordError,
  withProfile,
} from 'state/profileSteps';
import { validatePassword, validateConfirmPassword } from '../../state/auth';
import { IconLoader, ShouldRender } from 'components';
import classNames from 'classnames';
import '../editProfile/creatorProfile.css';
import { Link } from 'react-router-dom';

const ChangePassword: FC<ProfileProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState({ message: '', value: false });
  const [formState, setFormState] = useState<IChangePassword>(
    defaultResetPassState
  );
  const [formError, setFormError] = useState<IChangePasswordError>(
    defaultResetPassState
  );

  const updateState = (key: string, value: string): void => {
    if (isSuccess.message) {
      setIsSuccess({ message: '', value: false });
    }
    setFormError((prev) => ({ ...prev, [key]: null }));
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const validateProfileForm = (): boolean => {
    const oldPassword = validatePassword({
      password: formState?.oldPassword || '',
      name: 'Old password',
    });
    const newPassword = validatePassword({
      password: formState?.newPassword || '',
      name: 'New Password',
    });
    const confirmPassword = validateConfirmPassword({
      password: formState?.newPassword || '',
      confirmPassword: formState?.confirmPassword || '',
    });
    if (newPassword || oldPassword || confirmPassword) {
      setFormError({ newPassword, oldPassword, confirmPassword });
      return false;
    }
    return true;
  };

  async function changePassword(oldPassword: string, newPassword: string) {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const data = await Auth.changePassword(user, oldPassword, newPassword);
      setIsLoading(false);
      setFormState(defaultResetPassState);
      setIsSuccess({
        message: 'Your password successfully changed',
        value: true,
      });
    } catch (err) {
      setIsSuccess({ message: err.message, value: false });
      setIsLoading(false);
    }
  }

  const submitProfile = () => {
    if (!isLoading && validateProfileForm()) {
      const { oldPassword, newPassword } = formState;
      setIsLoading(true);
      changePassword(oldPassword, newPassword);
    }
  };

  return (
    <div className="brand-dashboard__items user-profile-items h-full">
      <div className="brand-dashboard__item h-full">
        <div className="border border-[#F5F1E8] bg-white rounded-[16px] md:w-[50%] w-full m-auto p-[20px]">
          <div className="text-[#0E0D0D] uppercase justify-between head-text text-[16px] flex items-center font-[700] mb-[20px]">
            Change Password{' '}
            {/* <Link to={AuthRoutes.EditProfile} className="">
              <img src="images/swipeLeft.svg" alt="" />
            </Link> */}
          </div>
          <div className="brand-dashboard__profile-inputs">
            <div className="brand-dashboard__profile-group">
              <div className="brand-dashboard__profile-group">
                <div className="profile-label">Old password</div>
                <input
                  className="profile-input"
                  type="password"
                  value={formState.oldPassword}
                  onChange={(e): void =>
                    updateState('oldPassword', e.target.value)
                  }
                />
                <ShouldRender if={formError.oldPassword}>
                  <p className="error-text">{formError.oldPassword}</p>
                </ShouldRender>
              </div>
              <div className="brand-dashboard__profile-group">
                <div className="profile-label">New password</div>
                <input
                  className="profile-input"
                  type="password"
                  value={formState.newPassword}
                  onChange={(e): void =>
                    updateState('newPassword', e.target.value)
                  }
                />
                <ShouldRender if={formError.newPassword}>
                  <p className="error-text">{formError.newPassword}</p>
                </ShouldRender>
              </div>
              <div className="profile-label">Confirm new password</div>
              <input
                className="profile-input"
                type="password"
                value={formState.confirmPassword}
                onChange={(e): void =>
                  updateState('confirmPassword', e.target.value)
                }
              />
              <ShouldRender if={formError.confirmPassword}>
                <p className="error-text">{formError.confirmPassword}</p>
              </ShouldRender>
              <ShouldRender if={isSuccess.message}>
                <p
                  className={`${
                    isSuccess.value ? 'success-text' : 'error-text'
                  }`}
                >
                  {isSuccess.message}
                </p>
              </ShouldRender>
            </div>
          </div>
          {/* <div className="save-button-container">
            <button
              className="brand-dashboard__profile-button d-flex justify-center items-center"
              onClick={submitProfile}
            >
              <span className={classNames({ loading: isLoading })}>
                Change Password
              </span>
              {isLoading && <IconLoader color="#005f73" />}
            </button>
          </div> */}
          <div className="save-button-container mt-[22px] mb-[24px] flex items-center flex-row gap-[20px]">
          <Link to={AuthRoutes.EditProfile} >
            <button className="creator-button bg-white border border-[#3F3F46] text-[#3F3F46]" type='button'>
              <span>back</span>
            </button>
            </Link>
            <button className="creator-button">
              <span className="" onClick={submitProfile}>Update</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
