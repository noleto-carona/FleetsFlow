import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatThreadDto } from './dto/create-chat-thread.dto';
import { CreateChatMensagemDto } from './dto/create-chat-mensagem.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('threads')
  abrirThread(@Body() dto: CreateChatThreadDto) {
    return this.chatService.abrirThread(dto);
  }

  @Get('threads/match/:matchId')
  buscarThreadPorMatch(@Param('matchId', ParseIntPipe) matchId: number) {
    return this.chatService.buscarThreadPorMatch(matchId);
  }

  @Get('threads/:threadId/mensagens')
  listarMensagens(@Param('threadId', ParseIntPipe) threadId: number) {
    return this.chatService.listarMensagens(threadId);
  }

  @Post('threads/:threadId/mensagens')
  enviarMensagem(
    @Param('threadId', ParseIntPipe) threadId: number,
    @Body() dto: CreateChatMensagemDto,
  ) {
    return this.chatService.enviarMensagem(threadId, dto);
  }
}

