import { IsString } from "class-validator";

export class MajorUpdateRequest {
  @IsString()
  public name: string;

  @IsString()
  public status: string = 'Active';
}
