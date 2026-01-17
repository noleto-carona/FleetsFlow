import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateChatThreadDto {
  @IsNotEmpty()
  @IsInt()
  matchId: number;
}

