import { USER_TYPES } from 'API';
import { Auth, Hub, Storage } from 'aws-amplify';
import classNames from 'classnames';
import { getPageTitle } from 'components';
import { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { withProfile } from 'state/profileSteps';
import {
  AdminRoutes,
  AuthRoutes,
  BrandRoutes,
  CreatorRoutes,
  ProfileProps,
} from 'utils';
import {
  creativeLinking,
  Creators,
  ExitIcon,
  MenuIcon1,
  MenuIcon2,
  MenuIcon3,
  MenuIcon4,
  MenuIcon5,
  MenuIcon8,
} from '../../assets/icons/icons';

export const MobileHeader: FC<ProfileProps> = ({ profileState: { data } }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [openedSidebar, setOpenedSidebar] = useState(false);
  const [fullName, setFullName] = useState('');
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const onLogout = (): void => navigate(AuthRoutes.Logout);
  const handleMenuItem = (e: any, route: string): void => {
    e.preventDefault();
    navigate(route);
    setSelectedRoute(route);
  };

  const getImageFromS3 = async (id: string): Promise<void> => {
    try {
      const url = await Storage.get(`${id}/avatar/profile`);
      fetch(url).then((res) => {
        if (res.status === 200) setProfilePic(url);
        if (res.status === 404) setProfilePic('');
      });
    } catch (err) {
      console.log('Error', err);
    }
  };
  const getOption = (
    Icon: any,
    route: AuthRoutes | CreatorRoutes | BrandRoutes | AdminRoutes,
    isMobile?: boolean
  ): JSX.Element => {
    const classes = classNames({
      selected: pathname.includes(route) || selectedRoute === route,
    });

    return (
      <>
        <li
          className={`brand-dashboard__menu-item ${classes}`}
          onClick={(e): void => handleMenuItem(e, route)}
          data-tooltip-id={route}
          data-cy={`menu-${route.replace('/', '')}`}
        >
          <Icon
            className={`${route === AuthRoutes.BestPractices ||
              route === BrandRoutes.Brand ||
              route === AdminRoutes.Creators
              ? 'w-[24px]'
              : ''
              } ${selectedRoute === route ? 'active' : ''}`}
          />
          <span>{getPageTitle(route)}</span>
        </li>
        <ReactTooltip
          id={route}
          place={isMobile ? 'top' : 'right'}
          content={getPageTitle(route)}
          className={`z-50 ${isMobile ? 'mt-[-3px]' : 'ml-[30px]'} font-[600]`}
        />
      </>
    );
  };
  const location = useLocation();

  useEffect(() => {
    setSelectedRoute(location.pathname);
  }, [location]);

  const userName = useMemo(() => {
    let name = fullName.slice(0, 14);
    if (fullName.length > 14) name += '...';
    return name;
  }, [fullName]);

  const getUser = async () => {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const { family_name, name } = attributes;
    setFullName(name + ' ' + family_name);
  };

  const getLogo = () => {
    if (!openedSidebar) {
      if (data?.userType === USER_TYPES.CREATIVE_USER) {
        return '/images/logo-orange.png';
      } else if (data?.userType === USER_TYPES.BRAND_USER) {
        return '/images/logo-blue.png';
      } else {
        return '/images/logo.png';
      }
    }
  };

  Hub.listen('auth', ({ payload }) => {
    if (payload.event === 'updateUserAttributes') {
      getUser();
    }
  });

  useEffect(() => {
    if (data?.id) getImageFromS3(data.id);
  }, [data?.updatedAt]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className={`brand-dashboard__mobile-header `}>
        <Link
          to={AuthRoutes.Dashboard}
          className="brand-dashboard__mobile-logo"
        >
          <img alt="" src={getLogo()} />
        </Link>
        <Link
          to={AuthRoutes.EditProfile}
          className="brand-dashboard__mobile-avatar"
        >
          <img alt="" src={profilePic || '/images/default-image.png'} />
        </Link>
      </div>
      <div className={`brand-dashboard__mobile-menu `}>
        <ul className={`${data?.userType}`}>
          {data?.userType === USER_TYPES.CREATIVE_USER && (
            <Fragment key="creative menu options">
              {getOption(MenuIcon1, AuthRoutes.Dashboard, true)}
              {getOption(MenuIcon3, AuthRoutes.BrandBrief, true)}
              {getOption(MenuIcon4, CreatorRoutes.Creatives, true)}
              {getOption(MenuIcon5, CreatorRoutes.Wallet, true)}
              {getOption(MenuIcon8, AuthRoutes.BestPractices, true)}
              {getOption(ExitIcon, AuthRoutes.Logout, true)}
            </Fragment>
          )}
          {data?.userType === USER_TYPES.BRAND_USER && (
            <Fragment key="brand menu options">
              {getOption(MenuIcon1, AuthRoutes.Dashboard, true)}
              {getOption(MenuIcon3, AuthRoutes.BrandBrief, true)}
              {getOption(MenuIcon4, CreatorRoutes.Creatives, true)}
              {getOption(MenuIcon2, BrandRoutes.Brand, true)}
              {/* {getOption(MenuIcon9, AuthRoutes.Messages, true)} */}
              {getOption(ExitIcon, AuthRoutes.Logout, true)}
            </Fragment>
          )}
          {data?.userType === USER_TYPES.ADMIN_USER && (
            <Fragment key="admin menu options">
              {getOption(MenuIcon1, AuthRoutes.Dashboard, true)}
              {getOption(MenuIcon4, AdminRoutes.CreativeApproval, true)}
              {getOption(Creators, AdminRoutes.Creators, true)}
              {getOption(MenuIcon3, AdminRoutes.CreatorsPayouts, true)}
              {getOption(MenuIcon5, AdminRoutes.BrandBriefs, true)}
              {getOption(MenuIcon8, AuthRoutes.BestPractices, true)}
              {getOption(creativeLinking, AdminRoutes.CreativeRequests, true)}
              {getOption(ExitIcon, AuthRoutes.Logout, true)}
            </Fragment>
          )}
        </ul>
      </div>
      <div
        className={`brand-dashboard__sidebar ${openedSidebar ? 'opened' : ''
          }  ${data?.userType !== 'BRAND_USER' ? 'creative-sidebar' : ''}`}
      >
        <Link
          to={AuthRoutes.Dashboard}
          className={`brand-dashboard__logo ${openedSidebar ? 'full-logo' : ''
            }`}
        >
          <img alt="" src={getLogo()} />
        </Link>
        <div
          className="brand-dashboard__avatar-wrap"
          data-tooltip-id="Profile"
          onClick={(e): void => handleMenuItem(e, AuthRoutes.EditProfile)}
        >
          <div
            className="brand-dashboard__avatar"
            style={{
              backgroundImage: `url(${profilePic || '/images/default-image.png'
                })`,
            }}
          ></div>
        </div>
        <ReactTooltip
          id={'Profile'}
          place={'right'}
          content={`${data?.userType === USER_TYPES.CREATIVE_USER
            ? 'Creator'
            : data?.userType === USER_TYPES.BRAND_USER
              ? 'Brand'
              : 'Admin'
            } Profile`}
          className={`z-50 ml-[29px] mt-[-2px] font-[600]`}
        />
        <ul className={`${data?.userType} list-none brand-dashboard__menu`}>
          {data?.userType === USER_TYPES.CREATIVE_USER && (
            <Fragment key="creative menu options">
              {getOption(MenuIcon1, AuthRoutes.Dashboard)}
              {getOption(MenuIcon3, AuthRoutes.BrandBrief)}
              {getOption(MenuIcon4, CreatorRoutes.Creatives)}
              {getOption(MenuIcon5, CreatorRoutes.Wallet)}
              {getOption(MenuIcon8, AuthRoutes.BestPractices)}
              {/* {getOption(MenuIcon9, AuthRoutes.Messages)} */}
            </Fragment>
          )}
          {data?.userType === USER_TYPES.BRAND_USER && (
            <Fragment key="brand menu options">
              {getOption(MenuIcon1, AuthRoutes.Dashboard)}
              {getOption(MenuIcon3, AuthRoutes.BrandBrief)}
              {getOption(MenuIcon4, CreatorRoutes.Creatives)}
              {getOption(MenuIcon2, BrandRoutes.Brand)}
              {/* {getOption(MenuIcon9, AuthRoutes.Messages)} */}
            </Fragment>
          )}
          {data?.userType === USER_TYPES.ADMIN_USER && (
            <Fragment key="admin menu options">
              {getOption(MenuIcon1, AuthRoutes.Dashboard)}
              {getOption(MenuIcon4, AdminRoutes.CreativeApproval)}
              {getOption(Creators, AdminRoutes.Creators)}
              {getOption(MenuIcon3, AdminRoutes.BrandBriefs)}
              {getOption(MenuIcon5, AdminRoutes.CreatorsPayouts)}
              {getOption(creativeLinking, AdminRoutes.CreativeRequests)}
              {getOption(MenuIcon8, AuthRoutes.BestPractices)}
            </Fragment>
          )}
        </ul>
        <a className="brand-dashboard__exit" onClick={onLogout}>
          <ExitIcon />
          <span>Logout</span>
        </a>
      </div>
    </>
  );
};

export default withProfile(MobileHeader);
