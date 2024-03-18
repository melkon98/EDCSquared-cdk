import { AuthRoutes, ProfileProps } from 'utils';
import { FullPageLoader, replaceSubPath } from 'components';
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { withProfile } from 'state/profileSteps';
import { USER_TYPES } from 'API';

const RedirectingStep: React.FC<ProfileProps> = ({
  profileState: { data },
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathnameParts = pathname.split('/');

  const redirectToValidRoute = (): void => {
    if (
      pathnameParts.length === 3 &&
      pathnameParts[2]?.length &&
      data?.userType === USER_TYPES.CREATIVE_USER
    )
      navigate(replaceSubPath(AuthRoutes.Tiktok));
    else navigate(AuthRoutes.Dashboard);
  };

  useEffect(() => {
    if (data) redirectToValidRoute();
  }, [data]);

  return <FullPageLoader />;
};

export default withProfile(RedirectingStep);
