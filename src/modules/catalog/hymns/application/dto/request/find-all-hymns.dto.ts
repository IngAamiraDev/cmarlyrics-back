import { Transform } from 'class-transformer';
import {
    IsBoolean,
    IsInt,
    IsOptional,
    IsString,
    Min,
} from 'class-validator';

export class FindAllHymnsDto {

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(1)
    page = 1;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsInt()
    @Min(1)
    limit = 20;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @Transform(({ value }) => value === 'true')
    @IsBoolean()
    favorite?: boolean;

    @IsOptional()
    @IsString()
    author?: string;

    @IsOptional()
    @IsString()
    category?: string;

}