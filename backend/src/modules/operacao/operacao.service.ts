import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOperacaoDto } from './dto/create-operacao.dto';
import { UpdateOperacaoStatusDto } from './dto/update-operacao-status.dto';

@Injectable()
export class OperacaoService {
  constructor(private readonly prisma: PrismaService) {}

  async criarParaContrato(dto: CreateOperacaoDto) {
    const contrato = await this.prisma.contrato.findUnique({
      where: { id: dto.contratoId },
      include: { match: true },
    });

    if (!contrato || !contrato.match) {
      throw new NotFoundException('Contrato ou match associado não encontrado');
    }

    const operacao = await this.prisma.operacao.create({
      data: {
        contratoId: contrato.id,
        embarcacaoId: contrato.match.embarcacaoId,
      },
    });

    return operacao;
  }

  async atualizarStatus(id: number, dto: UpdateOperacaoStatusDto) {
    const operacao = await this.prisma.operacao.findUnique({
      where: { id },
    });

    if (!operacao) {
      throw new NotFoundException('Operação não encontrada');
    }

    return this.prisma.operacao.update({
      where: { id },
      data: {
        status: dto.status ?? operacao.status,
        dataInicioReal: dto.dataInicioReal
          ? new Date(dto.dataInicioReal)
          : operacao.dataInicioReal,
        dataFimReal: dto.dataFimReal
          ? new Date(dto.dataFimReal)
          : operacao.dataFimReal,
      },
    });
  }
}

