import { IsString } from 'class-validator';

export class RoleUpdateRequest {
  @IsString()
  name: string;
}
