import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDemandaSpotDto {
  @IsNotEmpty()
  @IsNumber()
  contratanteId: number;

  @IsNotEmpty()
  @IsString()
  tipoServico: string;

  @IsOptional()
  @IsString()
  localizacao?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsNotEmpty()
  @IsDateString()
  dataInicio: string;

  @IsNotEmpty()
  @IsDateString()
  dataFim: string;

  @IsOptional()
  requisitos?: any;
}
