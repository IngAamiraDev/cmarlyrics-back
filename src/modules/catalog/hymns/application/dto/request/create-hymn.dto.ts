import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";

export class CreateHymnDto {

  @IsInt()
  number: number;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsString()
  lyrics: string;

  @IsOptional()
  @IsInt()
  page?: number;

  @IsOptional()
  @IsBoolean()
  favorite?: boolean;

}