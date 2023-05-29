import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/enums/role.enum';
import { ForbiddenException } from 'src/exceptions/ForbiddenException';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const { user } = context.switchToHttp().getRequest<{ user: User }>();
    if (!this.hasRoles(user, requiredRoles)) throw new ForbiddenException();
    return true;
  }

  private hasRoles(user?: User, requiredRoles?: Array<Role>): boolean {
    return !requiredRoles || requiredRoles.some((role) => user.roles?.includes(role));
  }
}
