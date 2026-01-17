import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ComplianceService } from './compliance.service';
import { CreateDocumentoEmpresaDto } from './dto/create-documento-empresa.dto';
import { CreateComplianceDocumentoDto } from './dto/create-compliance-documento.dto';
import { CreateTripulanteDocumentoDto } from './dto/create-tripulante-documento.dto';
import { UpdateDocStatusDto } from './dto/update-doc-status.dto';

@Controller('compliance')
export class ComplianceController {
  constructor(private readonly complianceService: ComplianceService) {}

  @Get('empresa/:empresaId')
  listarPorEmpresa(@Param('empresaId', ParseIntPipe) empresaId: number) {
    return this.complianceService.listarPorEmpresa(empresaId);
  }

  @Post('documentos/empresa')
  criarDocumentoEmpresa(@Body() dto: CreateDocumentoEmpresaDto) {
    return this.complianceService.criarDocumentoEmpresa(dto);
  }

  @Post('documentos/perfil')
  criarComplianceDocumento(@Body() dto: CreateComplianceDocumentoDto) {
    return this.complianceService.criarComplianceDocumento(dto);
  }

  @Post('documentos/tripulante')
  criarTripulanteDocumento(@Body() dto: CreateTripulanteDocumentoDto) {
    return this.complianceService.criarTripulanteDocumento(dto);
  }

  @Patch('documentos/compliance/:id/status')
  atualizarStatusCompliance(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDocStatusDto,
  ) {
    return this.complianceService.atualizarStatusComplianceDocumento(id, dto);
  }

  @Patch('documentos/tripulante/:id/status')
  atualizarStatusTripulante(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDocStatusDto,
  ) {
    return this.complianceService.atualizarStatusTripulanteDocumento(id, dto);
  }
}

