import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreatePagamentoDto {
  @IsString()
  contratoId: string;

  @IsNumber()
  @IsPositive()
  valorEscrow: number;
}

