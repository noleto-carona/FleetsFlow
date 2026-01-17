import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDemandaSpotDto } from './dto/create-demanda-spot.dto';
import { DemandaStatus } from '@prisma/client';

@Injectable()
export class DemandaSpotService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDemandaSpotDto: CreateDemandaSpotDto) {
    const { contratanteId, ...data } = createDemandaSpotDto;

    // Verifica se o contratante existe
    const contratante = await this.prisma.perfil.findUnique({
      where: { id: contratanteId },
    });

    if (!contratante) {
      throw new NotFoundException('Contratante (Perfil) não encontrado');
    }

    return this.prisma.demandaSpot.create({
      data: {
        ...data,
        dataInicio: new Date(data.dataInicio),
        dataFim: new Date(data.dataFim),
        contratante: {
          connect: { id: contratanteId },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.demandaSpot.findMany({
      where: {
        status: DemandaStatus.ABERTA,
      },
      include: {
        contratante: {
          select: {
            id: true,
            tipo: true,
            empresa: {
              select: {
                razaoSocial: true,
              },
            },
            reputacao: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
