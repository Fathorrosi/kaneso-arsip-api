import { IsInt, IsString, IsDate } from 'class-validator';

export class SubjectCreateRequest {
  @IsString()
  name: string;
}
