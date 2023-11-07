import { IsEmail, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class UserUpdateRequest {
  @MaxLength(20, { message: 'Nama depan maksimal 20 karakter' })
  @MinLength(2, { message: 'Nama depan minimal 2 karakter' })
  @IsString()
  @IsOptional()
  first_name: string;

  @MaxLength(20, { message: 'Nama belakang maksimal 20 karakter' })
  @MinLength(2, { message: 'Nama belakang minimal 2 karakter' })
  @IsString()
  @IsOptional()
  last_name: string;

  @IsEmail({}, { message: 'Format email salah' })
  @IsString()
  @IsOptional()
  email: string;

  @MaxLength(20)
  @MinLength(6, { message: 'Password minimal 6 karakter' })
  @IsString()
  @IsOptional()
  password: string;
}
