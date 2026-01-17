import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { DocStatus } from '@prisma/client';

export class UpdateDocStatusDto {
  @IsOptional()
  @IsEnum(DocStatus)
  status?: DocStatus;

  @IsOptional()
  @IsDateString()
  dataValidade?: string;

  @IsOptional()
  @IsString()
  observacao?: string;
}

