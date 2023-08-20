import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator'

export class PaginationDto {

    @IsOptional()
    @IsPositive()
    // @Type(() => Number) obligar la conversion
    limit?: number;

    @IsOptional()
    @IsPositive()
    // @Type(() => Number) obligar la conversion
    offset?: number;
}