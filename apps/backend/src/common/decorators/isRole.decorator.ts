import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Roles } from '../../roles/role.enum';

export const IsRole = createParamDecorator(
  (roles: Roles[], ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return roles.some((role) => request.user.role.name === role);
  }
);
