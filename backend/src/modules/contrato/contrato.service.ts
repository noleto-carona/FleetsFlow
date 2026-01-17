import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateContratoFromMatchDto } from './dto/create-contrato-from-match.dto';
import { randomBytes, createHash } from 'crypto';

@Injectable()
export class ContratoService {
  constructor(private readonly prisma: PrismaService) {}

  private gerarHashChave(valorBase: string) {
    const salt = randomBytes(8).toString('hex');
    return createHash('sha256').update(valorBase + salt).digest('hex');
  }

  async criarAPartirDoMatch(dto: CreateContratoFromMatchDto) {
    const match = await this.prisma.match.findUnique({
      where: { id: dto.matchId },
      include: {
        pme: true,
      },
    });

    if (!match) {
      throw new NotFoundException('Match não encontrado');
    }

    const valorBase = `${match.id}-${match.pmeId}-${match.embarcacaoId}`;
    const hashChave = this.gerarHashChave(valorBase);

    const contrato = await this.prisma.contrato.create({
      data: {
        matchId: match.id,
        hashChave,
        valor: dto.valor,
      },
    });

    return contrato;
  }
}

