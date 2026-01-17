import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { EmpresaModule } from './modules/empresa/empresa.module';
import { ContratoModule } from './modules/contrato/contrato.module';
import { OperacaoModule } from './modules/operacao/operacao.module';
import { PagamentoModule } from './modules/pagamento/pagamento.module';

@Module({
  imports: [PrismaModule, EmpresaModule, ContratoModule, OperacaoModule, PagamentoModule],
})
export class AppModule {}

