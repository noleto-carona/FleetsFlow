import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateChatThreadDto } from './dto/create-chat-thread.dto';
import { CreateChatMensagemDto } from './dto/create-chat-mensagem.dto';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async abrirThread(dto: CreateChatThreadDto) {
    const { matchId } = dto;

    const match = await this.prisma.match.findUnique({
      where: { id: matchId },
    });

    if (!match) {
      throw new NotFoundException('Match não encontrado');
    }

    const existing = await this.prisma.chatThread.findUnique({
      where: { matchId },
      include: {
        mensagens: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (existing) {
      return existing;
    }

    const novaThread = await this.prisma.chatThread.create({
      data: {
        matchId,
      },
    });

    return this.prisma.chatThread.findUnique({
      where: { id: novaThread.id },
      include: {
        mensagens: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });
  }

  async buscarThreadPorMatch(matchId: number) {
    const thread = await this.prisma.chatThread.findUnique({
      where: { matchId },
      include: {
        mensagens: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!thread) {
      throw new NotFoundException('Thread de chat não encontrada para este match');
    }

    return thread;
  }

  async listarMensagens(threadId: number) {
    const thread = await this.prisma.chatThread.findUnique({
      where: { id: threadId },
    });

    if (!thread) {
      throw new NotFoundException('Thread de chat não encontrada');
    }

    return this.prisma.chatMensagem.findMany({
      where: { threadId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async enviarMensagem(threadId: number, dto: CreateChatMensagemDto) {
    const thread = await this.prisma.chatThread.findUnique({
      where: { id: threadId },
      include: { match: true },
    });

    if (!thread) {
      throw new NotFoundException('Thread de chat não encontrada');
    }

    const autor = await this.prisma.perfil.findUnique({
      where: { id: dto.autorPerfilId },
    });

    if (!autor) {
      throw new NotFoundException('Perfil autor não encontrado');
    }

    return this.prisma.chatMensagem.create({
      data: {
        threadId,
        autorPerfilId: dto.autorPerfilId,
        conteudo: dto.conteudo,
        anexos: dto.anexos,
      },
    });
  }
}

