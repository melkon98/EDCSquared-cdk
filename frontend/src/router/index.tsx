import {
  AuthProps,
  AuthRoutes,
  BrandRoutes,
  ErrorProps,
  UnAuthRoutes,
} from 'utils';
import { FullPageLoader, replaceSubPath } from 'components';
import { isValidRoute, ShouldRender } from 'components';
import { LoginPage, LogoutPage } from 'pages';
import React, { Fragment, useEffect, useState } from 'react';
import {
  Route,
  Routes,
  RouteProps,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { withAuth } from 'state/auth';
import withError from 'state/error/withErrorHoc';
import {
  AuthRoutesArray,
  UnAuthRoutesArray,
} from './RoutesConstants';
import ToastContainer from 'components/toast';
import PreviewWindow from 'pages/previewWindow/previewWindow';
import AuthRouter from './AuthRouter';

const MainRouter: React.FC<AuthProps & ErrorProps> = ({
  authState: { isLoading, isLoggedIn, email },
  ...rest
}) => {
  const [pathFound, handlePathFound] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const redirectToInValidRoute = (): void => {
    if (pathname.split('/').length === 3) {
      navigate(replaceSubPath(UnAuthRoutes.SubLogin));
    } else navigate(UnAuthRoutes.Login);
  };

  useEffect(() => {
    if (pathname === BrandRoutes.LinkTiktokAccount) {
      const url = new URL(window.location.href);
      if (url.searchParams.get('code')) {
        localStorage.setItem('authTikTokCode', url.searchParams.get('code') || '')
        const urlWithoutParams = url.origin + url.pathname;
        window.location.href = urlWithoutParams
      }
    }
    if (pathname === BrandRoutes.LinkFacebookAccount) {
      const url = new URL(window.location.href);
      const code = url.searchParams.get('code') || null
      if (code) {
        localStorage.setItem('authFacebookCode', code);
        url.searchParams.delete('code');
        window.location.href = url.href;
        return;
      }
    }
    if (pathname === BrandRoutes.linkYoutubeAccount) {
      const url = new URL(window.location.href);
      const code = url.searchParams.get('code') || null;
      if (code) {
        localStorage.setItem('authYoutubeCode', code);
        const urlWithoutParams = window.location.origin + window.location.pathname;
        window.location.href = urlWithoutParams;
        return;
      }
    }
    if (pathname === AuthRoutes.EditProfile) {
      const url = new URL(window.location.href);
      const code = url.searchParams.get('code') || null;
      if (code) {
        if (url.href.includes('tiktok')) {
          localStorage.setItem('authTikTokCode', code)
          const urlWithoutParams = url.origin + url.pathname;
          window.location.href = urlWithoutParams
        }
        else if (url.href.includes('instagram')) {
          localStorage.setItem('authInstagramCode', code)
          const urlWithoutParams = url.origin + url.pathname;
          window.location.href = urlWithoutParams
        }
        else {
          localStorage.setItem('authYoutubeCode', code)
          const urlWithoutParams = window.location.origin + window.location.pathname;
          window.location.href = urlWithoutParams;
        }


        return;
      }
    }
    if (typeof isLoggedIn === 'boolean' && !isLoading) {
      if (
        isLoggedIn &&
        !isValidRoute(AuthRoutesArray, pathname) &&
        !pathname.includes(UnAuthRoutes.TermsAndConditions)
      )
        navigate(replaceSubPath(AuthRoutes.Redirector));
      else if (!isLoggedIn && !isValidRoute(UnAuthRoutesArray, pathname))
        redirectToInValidRoute();
      handlePathFound(true);
    }
  }, [isLoading, isLoggedIn, email]);

  return (
    <Fragment>
      <ToastContainer {...rest} />
      <ShouldRender if={!pathFound}>
        <FullPageLoader />
      </ShouldRender>

      <ShouldRender if={pathFound}>
        <>
          <Routes>
            <Route path={AuthRoutes.Logout} Component={LogoutPage} />
            <Route path={AuthRoutes.Preview} Component={PreviewWindow} />
            {/* <Route key={`${index}${route}`} path={route} Component={UnAuthRouter} /> */}
            {/* ))} */}

            <Route path={UnAuthRoutes.Login} Component={LoginPage} />
            <Route path={UnAuthRoutes.SignUp} Component={LoginPage} />
            <Route path={UnAuthRoutes.ForgotPass} Component={LoginPage} />
            <Route path={'/purpose'} Component={LoginPage} />

            <Route path={'*'} Component={AuthRouter} />

            {/* <AuthRouter /> */}
            {/* <UnAuthRouter /> */}
          </Routes>
        </>
      </ShouldRender>
    </Fragment >
  );
};

export default withError(withAuth(MainRouter));
