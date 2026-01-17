import { IsInt, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateDocumentoEmpresaDto {
  @IsNotEmpty()
  @IsInt()
  empresaId: number;

  @IsNotEmpty()
  @IsString()
  tipo: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  arquivoUrl: string;

  @IsOptional()
  @IsString()
  descricao?: string;
}

