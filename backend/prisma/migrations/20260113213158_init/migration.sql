-- CreateEnum
CREATE TYPE "PerfilTipo" AS ENUM ('ARMADOR_OFFSHORE', 'ARMADOR_CABOTAGEM', 'TERMINAL_PORTUARIO', 'PRATICAGEM', 'ARMADOR_FLUVIAL', 'MARITIMO_CRUZEIROS', 'REBOQUE_LANCHA', 'AGENTE_MARITIMO', 'CONTRATANTE', 'AGENTE_GOVERNAMENTAL', 'CERTIFICADOR', 'SEGURADORA');

-- CreateEnum
CREATE TYPE "DocStatus" AS ENUM ('PENDENTE', 'VALIDADO', 'INVALIDO', 'EXPIRADO');

-- CreateEnum
CREATE TYPE "DemandaStatus" AS ENUM ('ABERTA', 'EM_NEGOCIACAO', 'FECHADA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('PENDENTE', 'ACEITO', 'RECUSADO', 'EXPIRADO');

-- CreateEnum
CREATE TYPE "ContratoStatus" AS ENUM ('RASCUNHO', 'ASSINADO', 'EM_EXECUCAO', 'CONCLUIDO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "OperacaoStatus" AS ENUM ('AGENDADA', 'EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "PagamentoStatus" AS ENUM ('PENDENTE', 'RESERVADO', 'LIBERADO', 'CANCELADO');

-- CreateTable
CREATE TABLE "empresas" (
    "id" SERIAL NOT NULL,
    "razao_social" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "nome_fantasia" TEXT,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "cep" TEXT,
    "logradouro" TEXT,
    "numero" TEXT,
    "bairro" TEXT,
    "cidade" TEXT,
    "estado" TEXT,
    "responsavel_nome" TEXT NOT NULL,
    "responsavel_cpf" TEXT NOT NULL,
    "responsavel_cargo" TEXT NOT NULL,
    "aceite_lgpd" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "empresas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perfis" (
    "id" SERIAL NOT NULL,
    "tipo" "PerfilTipo" NOT NULL,
    "empresa_id" INTEGER NOT NULL,
    "chave_operacional" TEXT,
    "data_validade_chave" TIMESTAMP(3),
    "capital_social" DOUBLE PRECISION,
    "num_funcionarios" INTEGER,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "perfis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "embarcacoes" (
    "id" SERIAL NOT NULL,
    "imo_number" TEXT,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "bandeira" TEXT NOT NULL DEFAULT 'BRASILEIRA',
    "perfil_id" INTEGER NOT NULL,
    "ano_construcao" INTEGER,
    "capacidade_carga" DOUBLE PRECISION,
    "potencia_total" DOUBLE PRECISION,
    "posicionamento_dp" TEXT,
    "capacidade_guindaste" DOUBLE PRECISION,
    "num_tripulantes" INTEGER,
    "ativa" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "embarcacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certificados" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "embarcacao_id" INTEGER NOT NULL,
    "arquivo_url" TEXT NOT NULL,
    "data_validade" TIMESTAMP(3),
    "valido" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "certificados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compliance_documentos" (
    "id" SERIAL NOT NULL,
    "perfil_id" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "arquivo_url" TEXT NOT NULL,
    "status" "DocStatus" NOT NULL DEFAULT 'PENDENTE',
    "data_validade" TIMESTAMP(3),
    "observacao" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validado_em" TIMESTAMP(3),

    CONSTRAINT "compliance_documentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentos" (
    "id" SERIAL NOT NULL,
    "empresa_id" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "arquivo_url" TEXT NOT NULL,
    "descricao" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "documentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "demanda_spots" (
    "id" SERIAL NOT NULL,
    "contratante_id" INTEGER NOT NULL,
    "tipo_servico" TEXT NOT NULL,
    "localizacao" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3) NOT NULL,
    "requisitos" JSONB,
    "status" "DemandaStatus" NOT NULL DEFAULT 'ABERTA',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "demanda_spots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matches" (
    "id" SERIAL NOT NULL,
    "demanda_id" INTEGER NOT NULL,
    "pme_id" INTEGER NOT NULL,
    "embarcacao_id" INTEGER NOT NULL,
    "status" "MatchStatus" NOT NULL DEFAULT 'PENDENTE',
    "preco_proposto" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contratos" (
    "id" TEXT NOT NULL,
    "match_id" INTEGER NOT NULL,
    "hash_chave" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "status" "ContratoStatus" NOT NULL DEFAULT 'ASSINADO',
    "data_assinatura" TIMESTAMP(3),
    "data_inicio" TIMESTAMP(3),
    "data_fim" TIMESTAMP(3),
    "arquivo_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contratos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operacoes" (
    "id" SERIAL NOT NULL,
    "contrato_id" TEXT NOT NULL,
    "embarcacao_id" INTEGER NOT NULL,
    "status" "OperacaoStatus" NOT NULL DEFAULT 'AGENDADA',
    "data_inicio_real" TIMESTAMP(3),
    "data_fim_real" TIMESTAMP(3),
    "logs" JSONB,
    "alertas" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "operacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pagamentos" (
    "id" SERIAL NOT NULL,
    "contrato_id" TEXT NOT NULL,
    "valor_escrow" DOUBLE PRECISION NOT NULL,
    "status" "PagamentoStatus" NOT NULL DEFAULT 'PENDENTE',
    "data_liberacao" TIMESTAMP(3),
    "comprovante_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pagamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reputacao" (
    "id" SERIAL NOT NULL,
    "perfil_id" INTEGER NOT NULL,
    "score" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "operacoes_concluidas" INTEGER NOT NULL DEFAULT 0,
    "taxa_sucesso" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "emissoes_co2" DOUBLE PRECISION DEFAULT 0.0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reputacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "empresas_cnpj_key" ON "empresas"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "empresas_email_key" ON "empresas"("email");

-- CreateIndex
CREATE UNIQUE INDEX "perfis_chave_operacional_key" ON "perfis"("chave_operacional");

-- CreateIndex
CREATE INDEX "perfis_empresa_id_idx" ON "perfis"("empresa_id");

-- CreateIndex
CREATE INDEX "perfis_chave_operacional_idx" ON "perfis"("chave_operacional");

-- CreateIndex
CREATE UNIQUE INDEX "embarcacoes_imo_number_key" ON "embarcacoes"("imo_number");

-- CreateIndex
CREATE INDEX "embarcacoes_perfil_id_idx" ON "embarcacoes"("perfil_id");

-- CreateIndex
CREATE INDEX "embarcacoes_imo_number_idx" ON "embarcacoes"("imo_number");

-- CreateIndex
CREATE INDEX "certificados_embarcacao_id_idx" ON "certificados"("embarcacao_id");

-- CreateIndex
CREATE INDEX "certificados_data_validade_idx" ON "certificados"("data_validade");

-- CreateIndex
CREATE INDEX "compliance_documentos_perfil_id_idx" ON "compliance_documentos"("perfil_id");

-- CreateIndex
CREATE INDEX "compliance_documentos_status_idx" ON "compliance_documentos"("status");

-- CreateIndex
CREATE INDEX "documentos_empresa_id_idx" ON "documentos"("empresa_id");

-- CreateIndex
CREATE INDEX "demanda_spots_contratante_id_idx" ON "demanda_spots"("contratante_id");

-- CreateIndex
CREATE INDEX "demanda_spots_status_idx" ON "demanda_spots"("status");

-- CreateIndex
CREATE INDEX "matches_demanda_id_idx" ON "matches"("demanda_id");

-- CreateIndex
CREATE INDEX "matches_pme_id_idx" ON "matches"("pme_id");

-- CreateIndex
CREATE UNIQUE INDEX "matches_demanda_id_pme_id_embarcacao_id_key" ON "matches"("demanda_id", "pme_id", "embarcacao_id");

-- CreateIndex
CREATE UNIQUE INDEX "contratos_match_id_key" ON "contratos"("match_id");

-- CreateIndex
CREATE INDEX "contratos_hash_chave_idx" ON "contratos"("hash_chave");

-- CreateIndex
CREATE UNIQUE INDEX "operacoes_contrato_id_key" ON "operacoes"("contrato_id");

-- CreateIndex
CREATE UNIQUE INDEX "pagamentos_contrato_id_key" ON "pagamentos"("contrato_id");

-- CreateIndex
CREATE UNIQUE INDEX "reputacao_perfil_id_key" ON "reputacao"("perfil_id");

-- AddForeignKey
ALTER TABLE "perfis" ADD CONSTRAINT "perfis_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "embarcacoes" ADD CONSTRAINT "embarcacoes_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificados" ADD CONSTRAINT "certificados_embarcacao_id_fkey" FOREIGN KEY ("embarcacao_id") REFERENCES "embarcacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_documentos" ADD CONSTRAINT "compliance_documentos_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentos" ADD CONSTRAINT "documentos_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demanda_spots" ADD CONSTRAINT "demanda_spots_contratante_id_fkey" FOREIGN KEY ("contratante_id") REFERENCES "perfis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_demanda_id_fkey" FOREIGN KEY ("demanda_id") REFERENCES "demanda_spots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_pme_id_fkey" FOREIGN KEY ("pme_id") REFERENCES "perfis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_embarcacao_id_fkey" FOREIGN KEY ("embarcacao_id") REFERENCES "embarcacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contratos" ADD CONSTRAINT "contratos_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "matches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operacoes" ADD CONSTRAINT "operacoes_contrato_id_fkey" FOREIGN KEY ("contrato_id") REFERENCES "contratos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operacoes" ADD CONSTRAINT "operacoes_embarcacao_id_fkey" FOREIGN KEY ("embarcacao_id") REFERENCES "embarcacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamentos" ADD CONSTRAINT "pagamentos_contrato_id_fkey" FOREIGN KEY ("contrato_id") REFERENCES "contratos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reputacao" ADD CONSTRAINT "reputacao_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
