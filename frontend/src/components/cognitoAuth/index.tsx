import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Auth, CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import AwsConfig from '../../hooks/apollo/awsConfig';
import { Amplify, Hub } from 'aws-amplify';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import CognitoForgotPassword from './ForgotPassord';
import CognitoLogin from './Login';
import { AuthRoutes, UnAuthRoutes } from 'utils';
import CognitoSignup from './Signup';
import { IconLoader } from 'components/loader';

Amplify.configure(AwsConfig);

type AuthParameters = {
  email: string;
  password: string;
  firstname: string;
  surname: string;
  fullname: string;
};

type ConfirmSignUpParameters = {
  username: string;
  code: string;
};

export const CognitoAuth: FC = () => {
  const { pathname } = useLocation();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [userFullName, setUserFullName] = useState('')
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [customState, setCustomState] = useState<string | null>(null);
  const [AuthType, setAuthType] = useState({ type: 'login', text: 'Login' });
  const [emailSended, setEmailSended] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthParameters>();

  const sendData: SubmitHandler<AuthParameters> = (data) => {
    setLoading(true);
    if (AuthType.type === 'login') {
      signIn(data);
    } else if (AuthType.type === 'signup') {
      const { password, email, fullname } = data;
      const signupData = {
        username: email,
        password,
        attributes: { family_name: fullname, name: fullname },
      };
      signUp(signupData);
    } else {
      if (emailSended) {
        forgotPasswordSubmit(email, code, data.password);
      } else {
        forgotPassword(data.email);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = Hub.listen('auth', ({ payload: { event, data } }) => {
      switch (event) {
        case 'signIn':
          setUser(data);
          break;
        case 'signOut':
          setUser(null);
          break;
        case 'customOAuthState':
          setCustomState(data);
      }
    });

    getUser();

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (pathname === UnAuthRoutes.SignUp) {
      setAuthType({ type: 'signup', text: 'Sign up' });
    } else if (pathname === UnAuthRoutes.ForgotPass) {
      setAuthType({ type: 'resetPass', text: 'Forgot password' });
    } else {
      setEmailSended(false);
      setAuthType({ type: 'login', text: 'Login' });
    }
  }, [pathname]);

  const getsocialshow = () => {
    if (AuthType.type === 'resetPass' || emailSended) return false;
    else return true;
  };

  const showSubmitButton = () => {
    if (AuthType.type !== 'resetPass' && emailSended) {
      return false;
    }
    return true;
  };

  const getUser = async (): Promise<void> => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      setUser(currentUser);
    } catch (error) {
      console.error(error);
    }
  };

  const signUp = async (data) => {
    try {
      const { user } = await Auth.signUp(data);
      setEmailSended(true);
      setEmail(data.username);
      setUserFullName(data.attributes.name)
      setPassword(data.password);
    } catch (error) {
      AuthError(error?.message);
    }
  };

  const signIn = async ({ email, password }) => {
    try {
      const user = await Auth.signIn(email, password);
      window.location.href = AuthRoutes.Dashboard;
    } catch (error) {
      if (error?.message === 'User is not confirmed.') {
        setPassword(password);
        setEmail(email);
        resendConfirmationCode(email);
        setEmailSended(true);
      } else {
        AuthError(error?.message);
      }
    }
  };

  const changeAuthType = (type) => {
    if (type === 'signup') {
      setAuthType({ type: 'signup', text: 'Sign up' });
      navigate(UnAuthRoutes.SignUp);
    } else if (type === 'login') {
      setAuthType({ type: 'login', text: 'Login' });
      navigate(UnAuthRoutes.Login);
    } else {
      setAuthType({ type: 'resetPass', text: 'Forgot password' });
      navigate(UnAuthRoutes.ForgotPass);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const data = await Auth.forgotPassword(email);
      setEmail(email);
      setEmailSended(true);
    } catch (err) {
      AuthError(err?.message);
    }
  };

  async function forgotPasswordSubmit(
    email: string,
    code: string,
    newPassword: string
  ) {
    try {
      const data = await Auth.forgotPasswordSubmit(email, code, newPassword);
      setAuthType({ type: 'login', text: 'Login' });
      setEmailSended(false);
    } catch (err) {
      AuthError(err?.message);
    }
  }

  async function confirmSignUp({ username, code }: ConfirmSignUpParameters) {
    try {
      await Auth.confirmSignUp(username, code);
      signIn({
        email,
        password,
      });
    } catch (error) {
      setLoading(false);
      AuthError(error?.message);
    }
  }

  async function resendConfirmationCode(username) {
    try {
      await Auth.resendSignUp(username);
    } catch (err) {
      console.log('error resending code: ', err);
    }
  }

  const sendForgotPassCode = (code: string) => {
    setCode(code);
  };

  const sendSignupVerificationCode = (code: string) => {
    setLoading(true);
    confirmSignUp({ username: email, code });
  };

  const AuthError = (error) => {
    setError(error);
    setTimeout(() => {
      setError('');
    }, 4000);
  };

  const listener = (data) => {
    switch (data?.payload?.event) {
      case 'configured':
        setLoading(false);
        break;
      case 'confirmSignUp':
        setLoading(true);
        break;
    }
  };

  Hub.listen('auth', listener);

  // useEffect(() => {sendEmail({variables:{name: 'Armen', email:'armvar774@gmail.com'}})},[])

  return (
    <Wrapper onSubmit={handleSubmit(sendData)} autoComplete="off">
      <AuthTypeText>{AuthType.text}</AuthTypeText>
      {getsocialshow() && (
        <>
          <SocialMedia>
            <FacebookButton
              onClick={() =>
                Auth.federatedSignIn({
                  provider: CognitoHostedUIIdentityProvider.Facebook,
                })
              }
            >
              <img className="socialSignIn" src={'/images/facebookLogo.png'} />
              <h6 className="pl-3">Continue with Facebook</h6>
            </FacebookButton>
            <GoogleButton
              onClick={() =>
                Auth.federatedSignIn({
                  provider: CognitoHostedUIIdentityProvider.Google,
                })
              }
            >
              <img className="socialSignIn" src={'/images/googleLogo.svg'} />
              <h6 className="pl-3">Continue with Google</h6>
            </GoogleButton>
          </SocialMedia>
          <LoginChoice className="col my-3 text-center">
            <p>OR</p>
          </LoginChoice>
        </>
      )}
      {AuthType.type === 'login' ? (
        <CognitoLogin
          {...{
            register,
            callback: sendSignupVerificationCode,
            emailSended,
            loading,
          }}
        />
      ) : AuthType.type === 'signup' ? (
        <CognitoSignup
          {...{
            register,
            callback: sendSignupVerificationCode,
            emailSended,
            loading,
          }}
        />
      ) : (
        <CognitoForgotPassword
          {...{ register, callback: sendForgotPassCode, emailSended }}
        />
      )}
      {AuthType.type !== 'login' ||
        emailSended ||
        ('resetPass' && (
          <div className="my-3 d-flex justify-between align-items-center">
            <CheckForm>
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberCheckbox"
              />
              <label className=" font-weight-normal" htmlFor="rememberCheckbox">
                Remember me
              </label>
            </CheckForm>
            <ForgotText onClick={() => changeAuthType('resetPass')}>
              Forgot your password?
            </ForgotText>
          </div>
        ))}
      {showSubmitButton() ? (
        <LoginButton data-cy="loginForm">
          {loading ? <IconLoader /> : AuthType.text}
        </LoginButton>
      ) : null}

      {!emailSended && (
        <>
          <SignUpText>
            {AuthType.type === 'login' ? (
              <> Don't have an account? </>
            ) : (
              <>Already have an account?</>
            )}
            <span
              onClick={() => {
                changeAuthType(AuthType.type === 'login' ? 'signup' : 'login');
                reset((formValues) => ({
                  ...formValues,
                  email: '',
                  password: '',
                }));
              }}
            >
              {' '}
              {AuthType.type === 'login' ? (
                <>Sign up here.</>
              ) : (
                <>Login here.</>
              )}{' '}
            </span>
            If you're a brand please get in touch{' '}
            <a href={`${process.env.REACT_APP_URL}connect`}>here.</a>
          </SignUpText>
        </>
      )}

      {errors.email || errors.password || errors.fullname?.message || error ? (
        <ErrorMessage>
          {errors.email?.message ||
            errors.password?.message ||
            errors.fullname?.message ||
            error}
        </ErrorMessage>
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled.form`
  max-width: 620px;
  width: 100%;
  @media screen and (max-width: 635px) {
    padding: 0 15px;
  }
`;

const AuthTypeText = styled.h2`
  font-size: 46px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 40px;
  font-family: Oswald, sans-serif;
  text-transform: capitalize;
`;

const SocialMedia = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 522px) {
    flex-direction: column;
  }
  img {
    height: 40px;
    width: 40px;
  }
`;

const LoginChoice = styled.div`
  p {
    font-weight: 700;
  }
`;

const CheckForm = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  input {
    margin: 0 5px 0 0;
  }
  input:focuse {
    border-color: red;
  }
`;
const ForgotText = styled.h6`
  cursor: pointer;
  font-size: 15px;
`;

const LoginButton = styled.button`
  height: 56px;
  color: #fff;
  background-color: #101010;
  font-size: 16px;
  border-radius: 60px;
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 635px) {
    height: 44px;
  }
`;

const SignUpText = styled.div`
  font-size: 15px;
  span,
  a {
    color: #007bff;
    cursor: pointer;
  }
`;

const ErrorMessage = styled.div`
  margin-top: 10px;
  padding: 10px;
  background-color: #ffdede;
  font-weight: 500;
`;

const FacebookButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: rgb(39 143 255);
  padding: 5px 8px;
  border-radius: 10px;
  color: white;
  font-weight: 700;
  font-size: 16px;
  width: 44%;
  height: 50px;
  justify-content: center;
  @media screen and (max-width: 635px) {
    width: 48%;
    font-size: 14px;
  }
  @media screen and (max-width: 522px) {
    width: 100%;
    margin-bottom: 16px;
    height: auto;
  }
`;

const GoogleButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: #efefef;
  padding: 5px 8px;
  border-radius: 10px;
  color: black;
  font-weight: 700;
  font-size: 16px;
  width: 44%;
  height: 50px;
  justify-content: center;
  @media screen and (max-width: 635px) {
    width: 48%;
    font-size: 14px;
  }
  @media screen and (max-width: 522px) {
    width: 100%;
    height: auto;
  }
`;

export default CognitoAuth;
