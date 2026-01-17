import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMatchDto } from './dto/create-match.dto';

@Injectable()
export class MatchService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMatchDto) {
    // Verificar se Demanda, PME e Embarcação existem
    const demanda = await this.prisma.demandaSpot.findUnique({
      where: { id: dto.demandaId },
    });
    if (!demanda) throw new NotFoundException('Demanda não encontrada');

    const pme = await this.prisma.perfil.findUnique({ where: { id: dto.pmeId } });
    if (!pme) throw new NotFoundException('PME (Perfil) não encontrada');

    const embarcacao = await this.prisma.embarcacao.findUnique({
      where: { id: dto.embarcacaoId },
    });
    if (!embarcacao) throw new NotFoundException('Embarcação não encontrada');

    // Verificar unicidade (já existe match para essa combinação?)
    const existingMatch = await this.prisma.match.findUnique({
      where: {
        demandaId_pmeId_embarcacaoId: {
          demandaId: dto.demandaId,
          pmeId: dto.pmeId,
          embarcacaoId: dto.embarcacaoId,
        },
      },
    });

    if (existingMatch) {
      throw new ConflictException('Match já existe para esta combinação.');
    }

    return this.prisma.match.create({
      data: {
        demandaId: dto.demandaId,
        pmeId: dto.pmeId,
        embarcacaoId: dto.embarcacaoId,
        precoProposto: dto.precoProposto,
        status: 'PENDENTE',
      },
      include: {
        demanda: true,
        pme: { select: { id: true, tipo: true, empresa: { select: { razaoSocial: true } } } },
        embarcacao: true,
      },
    });
  }

  async findAllByPme(pmeId: number) {
    return this.prisma.match.findMany({
      where: { pmeId },
      include: {
        demanda: {
            include: {
                contratante: {
                    select: {
                        empresa: {
                            select: { razaoSocial: true }
                        }
                    }
                }
            }
        },
        contrato: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
