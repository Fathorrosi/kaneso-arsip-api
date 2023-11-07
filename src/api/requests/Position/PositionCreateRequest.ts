import { IsInt, IsString, IsDate } from 'class-validator';

export class PositionCreateRequest {
  @IsString()
  name: string;
}
