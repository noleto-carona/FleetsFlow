import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEmpresaPerfilDto } from './dto/create-empresa-perfil.dto';

@Injectable()
export class EmpresaService {
  constructor(private readonly prisma: PrismaService) {}

  async criarEmpresaComPerfil(dto: CreateEmpresaPerfilDto) {
    const empresa = await this.prisma.empresa.create({
      data: {
        razaoSocial: dto.razaoSocial,
        cnpj: dto.cnpj,
        nomeFantasia: dto.nomeFantasia,
        email: dto.email,
        telefone: dto.telefone,
        cep: dto.cep,
        logradouro: dto.logradouro,
        numero: dto.numero,
        bairro: dto.bairro,
        cidade: dto.cidade,
        estado: dto.estado,
        responsavelNome: dto.responsavelNome,
        responsavelCpf: dto.responsavelCpf,
        responsavelCargo: dto.responsavelCargo,
        aceiteLgpd: dto.aceiteLgpd,
        perfis: {
          create: {
            tipo: dto.tipoPerfil,
            capitalSocial: dto.capitalSocial,
            numFuncionarios: dto.numFuncionarios,
          },
        },
      },
      include: {
        perfis: true,
      },
    });
    return empresa;
  }

  async buscarEmpresaPorId(id: number) {
    return this.prisma.empresa.findUnique({
      where: { id },
      include: { perfis: true },
    });
  }
}

