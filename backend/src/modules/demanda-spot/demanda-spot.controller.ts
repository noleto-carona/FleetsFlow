import { Body, Controller, Get, Post } from '@nestjs/common';
import { DemandaSpotService } from './demanda-spot.service';
import { CreateDemandaSpotDto } from './dto/create-demanda-spot.dto';

@Controller('demanda-spot')
export class DemandaSpotController {
  constructor(private readonly demandaSpotService: DemandaSpotService) {}

  @Post()
  create(@Body() createDemandaSpotDto: CreateDemandaSpotDto) {
    return this.demandaSpotService.create(createDemandaSpotDto);
  }

  @Get()
  findAll() {
    return this.demandaSpotService.findAll();
  }
}
