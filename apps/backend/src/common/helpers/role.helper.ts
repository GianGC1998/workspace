import { AuthUserDto } from '../../auth/auth.dto';
import { Roles } from '../../roles/role.enum';

export const isRole = (user: AuthUserDto, roles: Roles[]) => {
  return roles.some((role) => user.role.name === role);
};
