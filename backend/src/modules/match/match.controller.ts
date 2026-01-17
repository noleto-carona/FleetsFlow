import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';

@Controller('matches')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  create(@Body() dto: CreateMatchDto) {
    return this.matchService.create(dto);
  }

  @Get('pme/:pmeId')
  findAllByPme(@Param('pmeId', ParseIntPipe) pmeId: number) {
    return this.matchService.findAllByPme(pmeId);
  }
}
