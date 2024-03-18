import {
  AdminRoutes,
  AuthRoutes,
  BrandRoutes,
  CreatorRoutes,
  UnAuthRoutes,
} from 'utils';

const mergeRouteObjects = (...routeObjects: Record<string, string>[]): string[] =>
  routeObjects.reduce<string[]>((acc, routeObj) => [...acc, ...Object.values(routeObj)], []);

export const UnAuthRoutesArray: string[] = Object.values(UnAuthRoutes);
export const CreatorAuthArray: string[] = mergeRouteObjects(AuthRoutes, CreatorRoutes);
export const BrandAuthArray: string[] = mergeRouteObjects(AuthRoutes, BrandRoutes);
export const AdminAuthArray: string[] = mergeRouteObjects(AuthRoutes, AdminRoutes);

export const AuthRoutesArray: string[] = mergeRouteObjects(AuthRoutes, CreatorRoutes, BrandRoutes, AdminRoutes);

export const AllRoutesArray: string[] = [...UnAuthRoutesArray, ...AuthRoutesArray];