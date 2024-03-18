import { Auth } from 'aws-amplify';
import { AuthProps, initialAuthContext, ProfileProps, UnAuthRoutes } from 'utils';
import { FC, Fragment, useEffect } from 'react';
import { withProfile } from 'state/profileSteps';
import { withAuth } from '../../state/auth';
import { useNavigate } from 'react-router-dom';

export const LogoutPage: FC<ProfileProps & AuthProps> = ({
  cleanProfileState,
  setAuthState,
}) => {
  const navigate = useNavigate()
  const logUserOut = async (): Promise<void> => {
    await Auth.signOut();
    setAuthState({ ...initialAuthContext });
    cleanProfileState();
    // window.location.href =
    //   process.env.REACT_APP_URL ||
    //   process.env.REACT_APP_URL ||
    //   '/';
    navigate(UnAuthRoutes.Login)
  };
  useEffect(() => {
    logUserOut();
  }, []);
  return <Fragment />;
};

export default withAuth(withProfile(LogoutPage));
