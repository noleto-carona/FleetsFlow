import { IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateMatchDto {
  @IsNotEmpty()
  @IsInt()
  demandaId: number;

  @IsNotEmpty()
  @IsInt()
  pmeId: number;

  @IsNotEmpty()
  @IsInt()
  embarcacaoId: number;

  @IsOptional()
  @IsNumber()
  precoProposto?: number;
}
