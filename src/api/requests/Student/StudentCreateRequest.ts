import { IsInt, IsString, IsDate, IsBoolean, IsOptional } from 'class-validator';

export class StudentCreateRequest {
  @IsString()
  nis: string;

  @IsString()
  name: string;

  @IsString()
  address: string;

  entry_on_date: Date;

  @IsOptional()
  graduate_on_date?: Date;

  @IsString()
  status: string;

  @IsBoolean()
  graduated: boolean;

  @IsOptional()
  @IsString()
  note?: string;

  @IsInt()
  major_id: number;
}
