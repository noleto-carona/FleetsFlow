import { Body, Controller, Post } from '@nestjs/common';
import { ContratoService } from './contrato.service';
import { CreateContratoFromMatchDto } from './dto/create-contrato-from-match.dto';

@Controller('contratos')
export class ContratoController {
  constructor(private readonly contratoService: ContratoService) {}

  @Post('from-match')
  criarContratoAPartirDoMatch(@Body() dto: CreateContratoFromMatchDto) {
    return this.contratoService.criarAPartirDoMatch(dto);
  }
}

