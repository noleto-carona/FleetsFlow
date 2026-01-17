import { IsString } from 'class-validator';

export class CreateOperacaoDto {
  @IsString()
  contratoId: string;
}

