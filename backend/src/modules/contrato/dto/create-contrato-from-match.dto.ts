import { IsNumber, IsPositive } from 'class-validator';

export class CreateContratoFromMatchDto {
  @IsNumber()
  @IsPositive()
  matchId: number;

  @IsNumber()
  @IsPositive()
  valor: number;
}

