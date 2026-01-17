import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { EmpresaModule } from './modules/empresa/empresa.module';
import { ContratoModule } from './modules/contrato/contrato.module';
import { OperacaoModule } from './modules/operacao/operacao.module';
import { PagamentoModule } from './modules/pagamento/pagamento.module';
import { DemandaSpotModule } from './modules/demanda-spot/demanda-spot.module';
import { MatchModule } from './modules/match/match.module';
import { ComplianceModule } from './modules/compliance/compliance.module';

@Module({
  imports: [PrismaModule, EmpresaModule, ContratoModule, OperacaoModule, PagamentoModule, DemandaSpotModule, MatchModule, ComplianceModule],
})
export class AppModule {}

