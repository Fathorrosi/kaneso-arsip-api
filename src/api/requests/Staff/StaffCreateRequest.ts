import { IsInt, IsString, IsDate } from 'class-validator';

export class StaffCreateRequest {
  @IsString()
  name: string;

  @IsString()
  nik: string;

  @IsString()
  employment_status: string;

  @IsString()
  position: string;

  @IsString()
  subject: string;

  @IsString()
  status: string;

  @IsString()
  department: string;

  enrollment_year: Date;

  // Tambahkan properti lain sesuai kebutuhan
}
