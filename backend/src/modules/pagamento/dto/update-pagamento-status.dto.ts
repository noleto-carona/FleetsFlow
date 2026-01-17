import { IsEnum } from 'class-validator';
import { PagamentoStatus } from '@prisma/client';

export class UpdatePagamentoStatusDto {
  @IsEnum(PagamentoStatus)
  status: PagamentoStatus;
}

