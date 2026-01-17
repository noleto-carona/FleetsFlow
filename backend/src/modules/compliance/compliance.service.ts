import { Injectable, NotFoundException } from '@nestjs/common';
import { DocStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDocumentoEmpresaDto } from './dto/create-documento-empresa.dto';
import { CreateComplianceDocumentoDto } from './dto/create-compliance-documento.dto';
import { CreateTripulanteDocumentoDto } from './dto/create-tripulante-documento.dto';
import { UpdateDocStatusDto } from './dto/update-doc-status.dto';

@Injectable()
export class ComplianceService {
  constructor(private readonly prisma: PrismaService) {}

  async listarPorEmpresa(empresaId: number) {
    const empresa = await this.prisma.empresa.findUnique({
      where: { id: empresaId },
      include: {
        documentos: true,
        tripulantes: {
          include: {
            documentos: true,
          },
        },
        perfis: {
          include: {
            complianceDocs: true,
            embarcacoes: {
              include: {
                certificados: true,
              },
            },
          },
        },
      },
    });

    if (!empresa) {
      throw new NotFoundException('Empresa não encontrada');
    }

    return empresa;
  }

  async criarDocumentoEmpresa(dto: CreateDocumentoEmpresaDto) {
    const empresa = await this.prisma.empresa.findUnique({
      where: { id: dto.empresaId },
    });

    if (!empresa) {
      throw new NotFoundException('Empresa não encontrada');
    }

    return this.prisma.documento.create({
      data: {
        empresaId: dto.empresaId,
        tipo: dto.tipo,
        arquivoUrl: dto.arquivoUrl,
        descricao: dto.descricao,
      },
    });
  }

  async criarComplianceDocumento(dto: CreateComplianceDocumentoDto) {
    const perfil = await this.prisma.perfil.findUnique({
      where: { id: dto.perfilId },
    });

    if (!perfil) {
      throw new NotFoundException('Perfil não encontrado');
    }

    return this.prisma.complianceDocumento.create({
      data: {
        perfilId: dto.perfilId,
        tipo: dto.tipo,
        arquivoUrl: dto.arquivoUrl,
        status: dto.status,
        dataValidade: dto.dataValidade ? new Date(dto.dataValidade) : undefined,
        observacao: dto.observacao,
      },
    });
  }

  async criarTripulanteDocumento(dto: CreateTripulanteDocumentoDto) {
    const tripulante = await this.prisma.tripulante.findUnique({
      where: { id: dto.tripulanteId },
    });

    if (!tripulante) {
      throw new NotFoundException('Tripulante não encontrado');
    }

    return this.prisma.tripulanteDocumento.create({
      data: {
        tripulanteId: dto.tripulanteId,
        tipo: dto.tipo,
        arquivoUrl: dto.arquivoUrl,
        status: dto.status,
        dataValidade: dto.dataValidade ? new Date(dto.dataValidade) : undefined,
        observacao: dto.observacao,
      },
    });
  }

  async atualizarStatusComplianceDocumento(id: number, dto: UpdateDocStatusDto) {
    const doc = await this.prisma.complianceDocumento.findUnique({
      where: { id },
    });

    if (!doc) {
      throw new NotFoundException('Documento de compliance não encontrado');
    }

    return this.prisma.complianceDocumento.update({
      where: { id },
      data: {
        status: dto.status ?? doc.status,
        dataValidade: dto.dataValidade
          ? new Date(dto.dataValidade)
          : doc.dataValidade,
        observacao: dto.observacao ?? doc.observacao,
        validadoEm:
          dto.status === DocStatus.VALIDADO ? new Date() : doc.validadoEm,
      },
    });
  }

  async atualizarStatusTripulanteDocumento(id: number, dto: UpdateDocStatusDto) {
    const doc = await this.prisma.tripulanteDocumento.findUnique({
      where: { id },
    });

    if (!doc) {
      throw new NotFoundException('Documento de tripulante não encontrado');
    }

    return this.prisma.tripulanteDocumento.update({
      where: { id },
      data: {
        status: dto.status ?? doc.status,
        dataValidade: dto.dataValidade
          ? new Date(dto.dataValidade)
          : doc.dataValidade,
        observacao: dto.observacao ?? doc.observacao,
        validadoEm:
          dto.status === DocStatus.VALIDADO ? new Date() : doc.validadoEm,
      },
    });
  }
}
