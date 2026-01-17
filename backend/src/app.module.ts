import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { EmpresaModule } from './modules/empresa/empresa.module';

@Module({
  imports: [PrismaModule, EmpresaModule],
})
export class AppModule {}

