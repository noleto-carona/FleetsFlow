import { Module } from '@nestjs/common';
import { OperacaoController } from './operacao.controller';
import { OperacaoService } from './operacao.service';

@Module({
  controllers: [OperacaoController],
  providers: [OperacaoService],
})
export class OperacaoModule {}

