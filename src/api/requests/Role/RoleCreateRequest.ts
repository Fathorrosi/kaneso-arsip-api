import { IsInt, IsString, IsDate } from 'class-validator';

export class RoleCreateRequest {
  @IsString()
  name: string;
}
