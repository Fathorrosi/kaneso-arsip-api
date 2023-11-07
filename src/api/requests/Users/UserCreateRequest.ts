import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class UserCreateRequest {
  @MaxLength(20, { message: 'Nama depan maksimal 20 karakter' })
  @MinLength(2, { message: 'Nama depan minimal 2 karakter' })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @MaxLength(20, { message: 'Nama belakang maksimal 20 karakter' })
  @MinLength(2, { message: 'Nama belakang minimal 2 karakter' })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail({}, { message: 'Format email salah' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @MaxLength(20)
  @MinLength(6, { message: 'Password minimal 6 karakter' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
