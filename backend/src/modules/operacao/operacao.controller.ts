import { Body, Controller, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { OperacaoService } from './operacao.service';
import { CreateOperacaoDto } from './dto/create-operacao.dto';
import { UpdateOperacaoStatusDto } from './dto/update-operacao-status.dto';

@Controller('operacoes')
export class OperacaoController {
  constructor(private readonly operacaoService: OperacaoService) {}

  @Post()
  criar(@Body() dto: CreateOperacaoDto) {
    return this.operacaoService.criarParaContrato(dto);
  }

  @Patch(':id')
  atualizarStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOperacaoStatusDto,
  ) {
    return this.operacaoService.atualizarStatus(id, dto);
  }
}

