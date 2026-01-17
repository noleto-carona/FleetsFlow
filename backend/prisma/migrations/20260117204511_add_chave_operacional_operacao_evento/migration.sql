-- CreateEnum
CREATE TYPE "ChaveOperacionalStatus" AS ENUM ('ATIVA', 'REVOGADA', 'EXPIRADA');

-- CreateTable
CREATE TABLE "tripulantes" (
    "id" SERIAL NOT NULL,
    "empresa_id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "funcao" TEXT,
    "registro_profissional" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tripulantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tripulante_documentos" (
    "id" SERIAL NOT NULL,
    "tripulante_id" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "arquivo_url" TEXT NOT NULL,
    "status" "DocStatus" NOT NULL DEFAULT 'PENDENTE',
    "data_validade" TIMESTAMP(3),
    "observacao" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validado_em" TIMESTAMP(3),

    CONSTRAINT "tripulante_documentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_threads" (
    "id" SERIAL NOT NULL,
    "match_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_threads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_mensagens" (
    "id" SERIAL NOT NULL,
    "thread_id" INTEGER NOT NULL,
    "autor_perfil_id" INTEGER NOT NULL,
    "conteudo" TEXT NOT NULL,
    "anexos" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_mensagens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chaves_operacionais" (
    "id" SERIAL NOT NULL,
    "perfil_id" INTEGER NOT NULL,
    "valor" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "status" "ChaveOperacionalStatus" NOT NULL DEFAULT 'ATIVA',
    "emitida_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expira_em" TIMESTAMP(3),
    "revogada_em" TIMESTAMP(3),
    "motivo_revogacao" TEXT,

    CONSTRAINT "chaves_operacionais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operacao_eventos" (
    "id" SERIAL NOT NULL,
    "operacao_id" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "payload" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "operacao_eventos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tripulantes_cpf_key" ON "tripulantes"("cpf");

-- CreateIndex
CREATE INDEX "tripulantes_empresa_id_idx" ON "tripulantes"("empresa_id");

-- CreateIndex
CREATE INDEX "tripulante_documentos_tripulante_id_idx" ON "tripulante_documentos"("tripulante_id");

-- CreateIndex
CREATE INDEX "tripulante_documentos_status_idx" ON "tripulante_documentos"("status");

-- CreateIndex
CREATE UNIQUE INDEX "chat_threads_match_id_key" ON "chat_threads"("match_id");

-- CreateIndex
CREATE INDEX "chat_mensagens_thread_id_idx" ON "chat_mensagens"("thread_id");

-- CreateIndex
CREATE INDEX "chat_mensagens_autor_perfil_id_idx" ON "chat_mensagens"("autor_perfil_id");

-- CreateIndex
CREATE INDEX "chaves_operacionais_perfil_id_idx" ON "chaves_operacionais"("perfil_id");

-- CreateIndex
CREATE INDEX "chaves_operacionais_status_idx" ON "chaves_operacionais"("status");

-- CreateIndex
CREATE INDEX "operacao_eventos_operacao_id_idx" ON "operacao_eventos"("operacao_id");

-- CreateIndex
CREATE INDEX "operacao_eventos_tipo_idx" ON "operacao_eventos"("tipo");

-- AddForeignKey
ALTER TABLE "tripulantes" ADD CONSTRAINT "tripulantes_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tripulante_documentos" ADD CONSTRAINT "tripulante_documentos_tripulante_id_fkey" FOREIGN KEY ("tripulante_id") REFERENCES "tripulantes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_threads" ADD CONSTRAINT "chat_threads_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "matches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_mensagens" ADD CONSTRAINT "chat_mensagens_thread_id_fkey" FOREIGN KEY ("thread_id") REFERENCES "chat_threads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_mensagens" ADD CONSTRAINT "chat_mensagens_autor_perfil_id_fkey" FOREIGN KEY ("autor_perfil_id") REFERENCES "perfis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chaves_operacionais" ADD CONSTRAINT "chaves_operacionais_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operacao_eventos" ADD CONSTRAINT "operacao_eventos_operacao_id_fkey" FOREIGN KEY ("operacao_id") REFERENCES "operacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
