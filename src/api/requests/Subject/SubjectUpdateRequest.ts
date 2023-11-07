import { IsString } from 'class-validator';

export class SubjectUpdateRequest {
  @IsString()
  name: string;
}
