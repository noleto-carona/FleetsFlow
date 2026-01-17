import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateChatMensagemDto {
  @IsNotEmpty()
  @IsInt()
  autorPerfilId: number;

  @IsNotEmpty()
  @IsString()
  conteudo: string;

  @IsOptional()
  anexos?: any;
}

