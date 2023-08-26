import {  UseGuards, applyDecorators } from '@nestjs/common';
import { validRols } from '../interfaces/valid-rols.enum';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role/user-role.guard';
import { RoleProtected } from './role-protected.decorator';


export function Auth(...roles: validRols[]) {
    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard(), UserRoleGuard),
    );
}