import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { DocStatus } from '@prisma/client';

export class CreateComplianceDocumentoDto {
  @IsNotEmpty()
  @IsInt()
  perfilId: number;

  @IsNotEmpty()
  @IsString()
  tipo: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  arquivoUrl: string;

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

