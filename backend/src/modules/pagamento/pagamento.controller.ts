import { Body, Controller, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoStatusDto } from './dto/update-pagamento-status.dto';

@Controller('pagamentos')
export class PagamentoController {
  constructor(private readonly pagamentoService: PagamentoService) {}

  @Post()
  criar(@Body() dto: CreatePagamentoDto) {
    return this.pagamentoService.criarParaContrato(dto);
  }

  @Patch(':id/status')
  atualizarStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePagamentoStatusDto,
  ) {
    return this.pagamentoService.atualizarStatus(id, dto);
  }
}

