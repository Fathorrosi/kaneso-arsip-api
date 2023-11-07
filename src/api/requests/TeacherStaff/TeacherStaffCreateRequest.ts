import { IsInt, IsString, IsDate } from 'class-validator';

export class TeacherStaffCreateRequest {
  @IsString()
  name: string;

  @IsString()
  nik: string;

  @IsString()
  employment_status: string;

  @IsInt()
  position_id: number;

  @IsInt()
  subject_id: number;

  @IsString()
  status: string;

  @IsInt()
  department_id: number;

  enrollment_year: Date;

  // Tambahkan properti lain sesuai kebutuhan
}
