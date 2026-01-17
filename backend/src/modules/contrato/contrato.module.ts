import { Module } from '@nestjs/common';
import { ContratoController } from './contrato.controller';
import { ContratoService } from './contrato.service';

@Module({
  controllers: [ContratoController],
  providers: [ContratoService],
})
export class ContratoModule {}

