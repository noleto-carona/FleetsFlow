import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { CreateEmpresaPerfilDto } from './dto/create-empresa-perfil.dto';

@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Post('onboarding')
  criarEmpresaComPerfil(@Body() dto: CreateEmpresaPerfilDto) {
    return this.empresaService.criarEmpresaComPerfil(dto);
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.empresaService.buscarEmpresaPorId(id);
  }
}

