import { IsString, IsDate, IsBoolean, IsOptional, IsInt } from 'class-validator';

export class StudentUpdateRequest {
  @IsString()
  nis: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  entry_on_date?: Date;

  @IsOptional()
  graduate_on_date?: Date;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsBoolean()
  graduated?: boolean;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsInt()
  major_id: number;
}
