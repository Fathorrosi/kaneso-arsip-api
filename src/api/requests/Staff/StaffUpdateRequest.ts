import { IsString, IsDate } from 'class-validator';

export class StaffUpdateRequest {
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
