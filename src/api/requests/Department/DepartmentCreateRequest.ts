import { IsInt, IsString, IsDate } from 'class-validator';

export class DepartmentCreateRequest {
  @IsString()
  name: string;
}
