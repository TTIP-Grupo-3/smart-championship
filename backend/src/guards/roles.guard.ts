import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/enums/role.enum';
import { ForbiddenException } from 'src/exceptions/ForbiddenException';
import { JwtAuthGuard } from './jwtAuth.guard';
import { getRequest } from 'src/utils/executionContext';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly jwtAuthGuard: JwtAuthGuard) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = getRequest(context);
    if (requiredRoles && requiredRoles.includes(Role.All)) {
      request.role = Role.All;
      return true;
    }
    const authenticated = await this.jwtAuthGuard.canActivate(context);
    const { user } = request;
    if (!authenticated || !this.hasRoles(user, requiredRoles)) throw new ForbiddenException();
    request.role = user?.role;
    return true;
  }

  private hasRoles(user?: User, requiredRoles?: Array<Role>): boolean {
    return !requiredRoles || requiredRoles.some((role) => (user?.roles as Array<Role>)?.includes(role));
  }
}
