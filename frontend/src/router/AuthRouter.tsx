import { USER_TYPES } from 'API';
import { BrandSteps, FullPageLoader, HomePage, isValidRoute } from 'components';
import CreateBrief from 'components/briefForm/briefForm';
import BriefFormStep2 from 'components/briefForm/briefFormStep2';
import CreatePractice from 'components/createPractice';
import CreativesTable from 'components/creativesTable/creativesTable';
import PaymentWindow from 'components/pymentWindow/PaymentWindow';
import withApolloProvider from 'hooks/apollo/withApollo';
import { SidebarLayout } from 'layout';
import { AuthorizeTikTokStep, Brief, Dashboard, LoginPage, RedirectingStep } from 'pages';
import AdminBrandBriefs from 'pages/adminBrandBriefs/adminBrandBriefs';
import AdminCreativeApproval from 'pages/adminCreativeApproval/adminCreativeApproval';
import AdminCreativeRequests from 'pages/adminCreativeRequests/adminCreativeRequests';
import AdminCreativeUsers from 'pages/adminCreativeUsers/AdminCreativeUsers';
import BestPractice from 'pages/bestPractice';
import ChangeEmail from 'pages/changeEmail';
import ChangePassword from 'pages/changePassword';
import CreativeRequests from 'pages/creativeRequests/creativeRequests';
import EditBrandProfile from 'pages/editProfile/brandProfile';
import EditProfile from 'pages/editProfile/userProfile';
import EditCreatorProfile from 'pages/editProfile/userProfileSecondPart';
import LinkFacebookAccount from 'pages/linkFacebookAccount';
import LinkTiktokAccount from 'pages/linkTiktokAccount';
import LinkYoutubeAccount from 'pages/linkYoutubeAccount';
import Messages from 'pages/messages/messages';
import MobileNumberVerification from 'pages/mobileNumberVerification';
import Wallet from 'pages/wallet/wallet';
import { FC, Fragment, useEffect } from 'react';
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { withProfile } from 'state/profileSteps';
import {
  AdminRoutes,
  AuthRoutes,
  BrandRoutes,
  CreatorRoutes,
  ProfileProps,
  UnAuthRoutes,
} from 'utils';
import { TermsAndConditions } from '../pages/termsAndConditions';
import {
  AdminAuthArray,
  BrandAuthArray,
  CreatorAuthArray,
} from './RoutesConstants';

const AuthRouterPaths: FC<ProfileProps> = ({
  profileState: { data, isLoading },
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (data?.userType === USER_TYPES.CREATIVE_USER) {
      document.documentElement.setAttribute('data-theme', 'creator');
    } else if (data?.userType === USER_TYPES.BRAND_USER) {
      document.documentElement.setAttribute('data-theme', 'brand');
    } else {
      document.documentElement.setAttribute('data-theme', 'admin');
    }

    if (pathname && data) {
      if (pathname.includes(UnAuthRoutes.TermsAndConditions)) {
        return;
      }
      if (
        (data?.userType === USER_TYPES.CREATIVE_USER &&
          !isValidRoute(CreatorAuthArray, pathname)) ||
        (data?.userType === USER_TYPES.BRAND_USER &&
          !isValidRoute(BrandAuthArray, pathname)) ||
        (data?.userType === USER_TYPES.ADMIN_USER &&
          !isValidRoute(AdminAuthArray, pathname))
      )
        navigate(AuthRoutes.Dashboard);
    }
  }, [pathname, data]);

  // TODO: Here we have a bug fix it.
  if (!isLoading && data)
    return (
      <Routes>
        <Route
          path={UnAuthRoutes.TermsAndConditions}
          element={<TermsAndConditions />}
        />


        <Route path={AuthRoutes.Redirector} element={<RedirectingStep />} />
        <Route path={AuthRoutes.Tiktok} element={<AuthorizeTikTokStep />} />
        <Route path="/" element={<SidebarLayout data={data} />}>

          <Route
            path={AuthRoutes.ChangePass}
            Component={ChangePassword}
          />
          <Route path={AuthRoutes.ChangeEmail} Component={ChangeEmail} />
          <Route
            path={AuthRoutes.MobileNumberVerify}
            element={<MobileNumberVerification />}
          />
          <Route path={AuthRoutes.EditProfile} element={<EditProfile />} />
          <Route path={AuthRoutes.Dashboard} element={<Dashboard />} />
          <Route path={AuthRoutes.BrandBrief} element={<Brief />} />
          <Route
            path={AuthRoutes.BestPractices}
            element={<BestPractice />}
          />

          {data.userType === USER_TYPES.ADMIN_USER && (
            <Fragment key="admin user routes">
              <Route
                path={AdminRoutes.CreatePractice}
                element={<CreatePractice />}
              />
              <Route
                path={AdminRoutes.CreatorsPayouts}
                element={<Dashboard />}
              />
              <Route
                path={AdminRoutes.EditPractice}
                element={<CreatePractice />}
              />
              <Route
                path={AdminRoutes.CreativeRequests}
                Component={AdminCreativeRequests}
              />
              <Route
                path={AdminRoutes.CreativeApproval}
                Component={AdminCreativeApproval}
              />
              <Route
                path={AdminRoutes.PaymentWindow}
                Component={PaymentWindow}
              />
              <Route
                path={AdminRoutes.Creators}
                Component={AdminCreativeUsers}
              />
              <Route
                path={AdminRoutes.BrandBriefs}
                Component={AdminBrandBriefs}
              />
            </Fragment>
          )}

          {data.userType === USER_TYPES.BRAND_USER && (
            <Fragment key="brand user routes">
              <Route
                path={BrandRoutes.LinkTiktokAccount}
                element={<LinkTiktokAccount />}
              />
              <Route path={AuthRoutes.Messages} element={<Messages />} />
              <Route
                path={BrandRoutes.LinkFacebookAccount}
                element={<LinkFacebookAccount />}
              />
              <Route
                path={BrandRoutes.linkYoutubeAccount}
                element={<LinkYoutubeAccount />}
              />
              <Route
                path={BrandRoutes.Creatives}
                element={<CreativesTable />}
              />
              <Route path={BrandRoutes.Brand} element={<HomePage />} />
              <Route
                path={BrandRoutes.EditBrand}
                element={<BrandSteps />}
              />
              <Route
                path={BrandRoutes.CreateBrief}
                Component={CreateBrief}
              />
              <Route
                path={BrandRoutes.BriefFormStep2}
                Component={BriefFormStep2}
              />
              <Route
                path={BrandRoutes.EditBrief}
                Component={CreateBrief}
              />
              <Route
                path={BrandRoutes.EditBrandProfile}
                element={<EditBrandProfile />}
              />
            </Fragment>
          )}

          {data.userType === USER_TYPES.CREATIVE_USER && (
            <Fragment>
              <Route
                path={CreatorRoutes.Wallet}
                element={<Wallet data={data} />}
              />
              <Route path={AuthRoutes.Messages} element={<Messages />} />
              <Route
                path={CreatorRoutes.EditCreatorProfile}
                Component={EditCreatorProfile}
              />
              <Route
                path={CreatorRoutes.Creatives}
                Component={CreativeRequests}
              />
            </Fragment>
          )}

          <Route
            path="/"
            Component={(): JSX.Element => (
              <Navigate replace to={AuthRoutes.Dashboard} />
            )}
          />
        </Route>
      </Routes>
    );
  return <FullPageLoader />;
};

const AuthRouterWithProfile = withProfile(AuthRouterPaths);
const AuthRouter: FC = () => <AuthRouterWithProfile shouldCallApi />;
export default withApolloProvider(AuthRouter);
