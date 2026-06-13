import { IsString } from 'class-validator';

export class CreateAgentDto {
  @IsString()
  name!: string;

  @IsString()
  type!: string; // coding, research, data_analyst, etc.

  @IsString()
  description?: string;
}
