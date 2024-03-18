import { USER_TYPES } from 'API';
import { startCase } from 'lodash';
import {
  AdminRoutes,
  allowedSubDomains,
  AuthRoutes,
  BrandRoutes,
  CreatorRoutes,
  IErrorStateType,
  UnAuthRoutes,
} from 'utils';

export const matchSlugUrls = (pathname: string, route: string): boolean => {
  if (!route.includes(':')) return pathname === route;
  const routeArr = route.split('/');
  const pathArr = pathname.split('/');
  if (routeArr.length !== pathArr.length) return false;
  for (const idx in routeArr) {
    if (routeArr[idx]?.includes(':')) {
      if (!pathArr[idx]?.length) return false;
      routeArr.splice(Number(idx), 1);
      pathArr.splice(Number(idx), 1);
    }
  }
  return pathArr.join('/') === routeArr.join('/');
};

export const isValidRoute = (
  routesArray: Array<string>,
  currentPathname: string
): boolean => {
  if (routesArray.includes(currentPathname)) return true;
  const sluggedRoutes = routesArray.filter((route) => route.includes(':'));
  // eslint-disable-next-line guard-for-in
  for (const idx in sluggedRoutes) {
    const isMatched = matchSlugUrls(currentPathname, sluggedRoutes[idx] || '');
    if (isMatched) return true;
  }
  return false;
};

export const updateErrorState = (
  data: IErrorStateType,
  setErrorState: React.Dispatch<React.SetStateAction<IErrorStateType[]>>
): void =>
  setErrorState((current) => [
    ...current,
    { id: Math.floor(Math.random() * 100), ...data },
  ]);

export const isEmptyString = (input?: string | null): boolean =>
  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  !input || !input.replace(/<\/?[^>]+(>|$)/g, '').length;

export const getPageTitle = (
  path: AuthRoutes | CreatorRoutes | BrandRoutes | AdminRoutes
): string => startCase(path.split('/')?.[1]);

export const isSubDomainWithBriefId = (id?: string): boolean => {
  const initialHost = window.location.hostname.split('.')[0];
  const length = id?.length || 0;
  return allowedSubDomains.includes(initialHost || '') && length > 8;
};

export const getMainDomainFromSubdomain = (): string => {
  const { protocol, host, pathname } = window.location;

  const hostnameParts = host.split('.');
  const explicitFalse = hostnameParts[0] === 'staging';
  if (!explicitFalse && allowedSubDomains.includes(hostnameParts[0] || ''))
    hostnameParts.shift();

  const pathnameParts = pathname.split('/');
  const unAuthRoutes = Object.values(UnAuthRoutes);
  let pathLastElem = pathnameParts.at(-1);
  while (pathLastElem) {
    // eslint-disable-next-line @typescript-eslint/no-loop-func
    const mainPath = unAuthRoutes.find((e) => e.includes(pathLastElem || ''));
    if (mainPath) break;
    pathnameParts.pop();
    pathLastElem = pathnameParts.at(-1);
  }
  return `${protocol}//${hostnameParts.join('.')}${pathnameParts.join('/')}`;
};

export const replaceSubPath = (path: string): string => {
  const desiredPathElems = path.split('/');
  const actualPathElems = window.location.pathname.split('/');
  if (desiredPathElems.length !== actualPathElems.length)
    getMainDomainFromSubdomain();

  const updatedPathElems = desiredPathElems.map((e, index) => {
    if (e.includes(':')) return actualPathElems[index];
    return e;
  });
  return updatedPathElems.join('/');
};

export const getProfileRole = (userType?: USER_TYPES | null): string => {
  if (userType === USER_TYPES.CREATIVE_USER) return 'Creator';
  if (userType === USER_TYPES.BRAND_USER) return 'Brand';
  return '';
};

export const getSlicedArray = <T>(
  array: Array<T>,
  limit: number,
  page: number
): Array<T> => array.slice(page * limit, (page + 1) * limit);

export const isValidUrl = (text: string): boolean => {
  try {
    const url = new URL(text);
    return ['http:', 'https:'].includes(url.protocol);
  } catch (err) {
    return false;
  }
};
