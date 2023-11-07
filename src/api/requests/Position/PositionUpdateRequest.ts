import { IsString } from 'class-validator';

export class PositionUpdateRequest {
  @IsString()
  name: string;
}
