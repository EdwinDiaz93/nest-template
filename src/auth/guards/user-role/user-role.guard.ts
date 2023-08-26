import { Reflector } from '@nestjs/core';
import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { META_ROLS } from 'src/auth/decorators';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {

  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(META_ROLS, context.getHandler())

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) throw new BadRequestException('user not found in the request');

    if (validRoles.length === 0) return true;

    const hasRol = user.roles.some(rol => validRoles.includes(rol));

    if (hasRol) return true;
    else
      throw new ForbiddenException(`user ${user.fullName} does not have permissions for this resource`);
  }
}
