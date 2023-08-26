import { SetMetadata } from '@nestjs/common';
import { validRols } from '../interfaces/valid-rols.enum';


export const META_ROLS = 'roles'

export const RoleProtected = (...args: validRols[]) => {
    return SetMetadata(META_ROLS, args);
};
