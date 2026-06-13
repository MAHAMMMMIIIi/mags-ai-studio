import { IsString, IsObject } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title!: string;

  @IsString()
  goal!: string; // What the agent needs to accomplish

  @IsObject()
  input!: Record<string, any>; // Input parameters

  @IsString()
  context?: string;
}
