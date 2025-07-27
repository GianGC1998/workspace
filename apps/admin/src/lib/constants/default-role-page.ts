import { Roles } from '@workspace/api-types';
import { FileRoutesByFullPath } from '../../routeTree.gen';

export const DEFAULT_ROLE_PAGE: Record<Roles, keyof FileRoutesByFullPath> = {
  [Roles.SUPERADMIN]: '/',
  [Roles.GERENTE_DE_TIENDA]: '/',
  [Roles.PROPIETARIO_DE_TIENDA]: '/',
};
