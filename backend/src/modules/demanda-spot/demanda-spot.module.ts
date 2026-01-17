import { Module } from '@nestjs/common';
import { DemandaSpotService } from './demanda-spot.service';
import { DemandaSpotController } from './demanda-spot.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DemandaSpotController],
  providers: [DemandaSpotService],
})
export class DemandaSpotModule {}
