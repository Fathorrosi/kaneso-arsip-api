import { IsString } from "class-validator";

export class MajorCreateRequest {
  @IsString()
  public name: string;

  @IsString()
  public status: string = 'Active';
}
