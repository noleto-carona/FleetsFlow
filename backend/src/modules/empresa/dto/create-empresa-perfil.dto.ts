import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { PerfilTipo } from '@prisma/client';

export class CreateEmpresaPerfilDto {
  @IsString()
  @MinLength(3)
  razaoSocial: string;

  @IsString()
  @MinLength(14)
  cnpj: string;

  @IsOptional()
  @IsString()
  nomeFantasia?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsString()
  cep?: string;

  @IsOptional()
  @IsString()
  logradouro?: string;

  @IsOptional()
  @IsString()
  numero?: string;

  @IsOptional()
  @IsString()
  bairro?: string;

  @IsOptional()
  @IsString()
  cidade?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsString()
  @MinLength(3)
  responsavelNome: string;

  @IsString()
  @MinLength(11)
  responsavelCpf: string;

  @IsString()
  @MinLength(2)
  responsavelCargo: string;

  @IsBoolean()
  aceiteLgpd: boolean;

  @IsEnum(PerfilTipo)
  tipoPerfil: PerfilTipo;

  @IsOptional()
  @IsNumber()
  capitalSocial?: number;

  @IsOptional()
  @IsNumber()
  numFuncionarios?: number;
}

