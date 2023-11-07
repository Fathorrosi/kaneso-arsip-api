import { IsString } from 'class-validator';

export class DepartmentUpdateRequest {
  @IsString()
  name: string;
}
