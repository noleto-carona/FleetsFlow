import { IsEnum, IsOptional, IsDateString } from 'class-validator';
import { OperacaoStatus } from '@prisma/client';

export class UpdateOperacaoStatusDto {
  @IsOptional()
  @IsEnum(OperacaoStatus)
  status?: OperacaoStatus;

  @IsOptional()
  @IsDateString()
  dataInicioReal?: string;

  @IsOptional()
  @IsDateString()
  dataFimReal?: string;
}

