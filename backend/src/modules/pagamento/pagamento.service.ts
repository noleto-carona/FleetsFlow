import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoStatusDto } from './dto/update-pagamento-status.dto';

@Injectable()
export class PagamentoService {
  constructor(private readonly prisma: PrismaService) {}

  async criarParaContrato(dto: CreatePagamentoDto) {
    const contrato = await this.prisma.contrato.findUnique({
      where: { id: dto.contratoId },
    });

    if (!contrato) {
      throw new NotFoundException('Contrato não encontrado');
    }

    const pagamento = await this.prisma.pagamento.create({
      data: {
        contratoId: contrato.id,
        valorEscrow: dto.valorEscrow,
      },
    });

    return pagamento;
  }

  async atualizarStatus(id: number, dto: UpdatePagamentoStatusDto) {
    const pagamento = await this.prisma.pagamento.findUnique({
      where: { id },
    });

    if (!pagamento) {
      throw new NotFoundException('Pagamento não encontrado');
    }

    return this.prisma.pagamento.update({
      where: { id },
      data: {
        status: dto.status,
      },
    });
  }
}

