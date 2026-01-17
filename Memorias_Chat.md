# Memórias do Chat - FleetsFlow

## Histórico de Alterações Relevantes

### [2026-01-14] Refinamentos de Interface e Áudio
- **Sidebar**:
  - Adicionado efeito sonoro suave (`ui-click-menu...`) ao passar o mouse (hover) nos itens de navegação.
  - Ajustado estilo de hover para usar a cor verde do tema (`#64ffda`) com 10% de opacidade, substituindo o fundo sólido ou escuro anterior.
- **Página de Operações**:
  - **Áudio**: 
    - Corrigido problema de som residual após mute. Implementado reset agressivo (`pause`, `currentTime=0`, `volume=0`).
    - Sincronização bidirecional entre botão Mute e Slider de Volume.
    - Estado inicial definido como Mudo (`isMuted=true`, `volume=0`) para respeitar políticas de autoplay do navegador e preferência do usuário.
    - Volume padrão ao desmutar definido para 15% (`0.15`).
  - **Layout**:
    - Reduzido tamanho do `RadarMap` para 480px (simulando zoom de 80%).
    - Painel "Live Telemetry" ajustado para `w-64` (anteriormente maior), alinhando com a redução visual da página.

### [2026-01-17] Regra Tailwind Híbrida e Controle de Volume Futurista
- **Padrão de Estilo (Frontend)**:
  - Definida abordagem oficial "Tailwind + Semântica" (híbrida) para todo código novo.
  - Classes seguem a ordem: semântica → Tailwind utilitário → condicionais, com padrão de nomes inspirado em BEM (`componente-elemento--estado`).
  - Começamos a aplicar este padrão na página de Operações (ex.: `audio-volume-container`, `audio-volume-bar-track`, etc.).
- **Página de Operações**:
  - Controle de volume redesenhado com visual futurista (barra gradiente e indicador de percentual).
  - Comportamento de áudio: inicia sempre mutado (`isMuted=true`, `volume=0`); o único controle é o slider de volume.
  - Volume > 0 desmuta e define o nível; volume em 0 volta a mutar e pausar o som ambiente.
  - Container e barra de volume deixados mais translúcidos (`bg-[#020617]/40` e `bg-[#020617]/10`) para revelar a grade do radar ao fundo.
  - **Ajustes de UX e Layout**:
    - Adicionados ícones de "grip" (alça) aos componentes flutuantes (Alerta e Áudio) para indicar visualmente que são movíveis, mantendo consistência com o painel de Telemetria.
    - Desabilitado o início de arrasto (drag) diretamente sobre a barra de volume para evitar conflitos ao ajustar o slider.
    - Largura do controle de áudio padronizada para `w-64` (igual ao Live Telemetry), com a barra interna se ajustando flexivelmente (`flex-1`).
    - Alerta e controle de áudio agora só se movem ao arrastar pelos grips (pontinhos), não mais por qualquer área do componente.
    - Versão das posições salvas em `localStorage` atualizada para `*_position_v3` para garantir um layout inicial limpo em relação a versões antigas.
    - **Nova Regra Global de Layout**: Deve-se priorizar o uso de **valores arbitrários em pixels** (ex.: `top-[50px]`, `w-[250px]`, `p-[12px]`) em todo o projeto, e não apenas em elementos flutuantes. O objetivo é garantir controle total e precisão exata nas dimensões e posicionamentos, evitando as limitações da escala padrão do Tailwind.

### [2026-01-17] Infra: PostgreSQL via Docker e Prisma
- **Docker / Banco de Dados**:
  - Configuração existente confirmada no arquivo `backend/docker-compose.yml` usando imagem `postgis/postgis:15-3.4-alpine`.
  - Variáveis de conexão (`DATABASE_URL`) em `backend/.env` já alinhadas para apontar para `localhost:5432/fleetsflow`.
  - Tentativa de subir o banco com `docker-compose up -d` falhou porque o Docker Desktop não está em execução/não foi encontrado no sistema (`open //./pipe/dockerDesktopLinuxEngine`).
- **Próximo passo operacional**:
  - Assim que o Docker Desktop estiver instalado e rodando, o fluxo recomendado será:
    1. `docker-compose up -d` na pasta `backend` para subir PostgreSQL e Redis.
    2. `npm run migrate:deploy` na pasta `backend` para aplicar as migrations do Prisma no banco.
 - **Atualização de documentação (status com tachado)**:
   - Arquivo `docs/MVP/ajustes-prisma-narrativa-operacao.md` recebeu um checklist rápido com itens concluídos marcados com tachado (Tripulação, Documentos de Tripulação e Chat seguro já implementados no schema e migrados).
   - Arquivo `docs/MVP/doc/OPERAÇÃO NARRADA SIMULADA.txt` ganhou um bloco final de “STATUS DE IMPLEMENTAÇÃO (MVP ATUAL)” com itens já suportados pelo modelo de dados marcados com tachado e itens futuros ainda em aberto sem tachado.

### [2026-01-17] Backend NestJS inicial e Onboarding de Empresa
- **Estrutura base do backend criada**:
  - Adicionada pasta `backend/src` com:
    - `main.ts`: inicialização do NestJS com prefixo global `/api` e `ValidationPipe` global.
    - `app.module.ts`: módulo raiz importando `PrismaModule`, `EmpresaModule`, `ContratoModule`, `OperacaoModule` e `PagamentoModule`.
  - Criado `PrismaModule` e `PrismaService` em `backend/src/prisma` para conectar ao PostgreSQL via Prisma.
- **Módulo de Empresa para onboarding**:
  - Criado `EmpresaModule` em `backend/src/modules/empresa` com serviço e controller.
  - DTO `CreateEmpresaPerfilDto` valida os campos principais de empresa, responsável e tipo de perfil.
  - Endpoint `POST /api/empresa/onboarding` cria `Empresa` e um `Perfil` associado na mesma transação.
  - Endpoint `GET /api/empresa/:id` retorna empresa e perfis relacionados.
- **Verificação**:
  - Comando `npm run build` no backend executado com sucesso após criação da estrutura.

### [2026-01-17] Modelos avançados e fluxo básico de Contrato/Operação/Pagamento
- **Prisma / Banco**:
  - Adicionados modelos `ChaveOperacional` e `OperacaoEvento` ao `schema.prisma`, com relações:
    - `Perfil` → `chavesOperacionais`
    - `Operacao` → `eventos`.
  - Rodada migration `add_chave_operacional_operacao_evento`, sincronizando o PostgreSQL com esses novos modelos.
- **Backend – Contrato**:
  - Criado `ContratoModule` com endpoint `POST /api/contratos/from-match` que:
    - Valida `matchId` e `valor`.
    - Busca o `Match` e gera um `Contrato` com `hashChave` derivado de dados do match (hash SHA-256 simples).
- **Backend – Operação**:
  - Criado `OperacaoModule` com:
    - `POST /api/operacoes`: cria `Operacao` a partir de um `contratoId`, ligando automaticamente à `embarcacao` do match.
    - `PATCH /api/operacoes/:id`: atualiza status e datas reais (`dataInicioReal`, `dataFimReal`).
- **Backend – Pagamento**:
  - Criado `PagamentoModule` com:
    - `POST /api/pagamentos`: cria registro de `Pagamento` para um contrato, em modo escrow simulado.
    - `PATCH /api/pagamentos/:id/status`: atualiza o `status` do pagamento (`PENDENTE`, `RESERVADO`, `LIBERADO`, `CANCELADO`).
- **Build**:
  - `npm run build` no backend executado com sucesso após inclusão desses módulos e DTOs.

### [2026-01-17] Backend - Marketplace (Demanda Spot)
- **Implementação do Item 3 (Backend)**:
  - Criado `DemandaSpotModule` (`backend/src/modules/demanda-spot`) com:
    - **Service**: 
      - `create`: Cria `DemandaSpot` validando existência do `contratante` (Perfil).
      - `findAll`: Lista demandas com status `ABERTA`, incluindo dados do contratante (razaoSocial, reputacao).
    - **Controller**:
      - `POST /api/demanda-spot`: Endpoint para criação.
      - `GET /api/demanda-spot`: Endpoint para listagem.
    - **DTO**: `CreateDemandaSpotDto` com validação de campos obrigatórios (`contratanteId`, `tipoServico`, `dataInicio`, `dataFim`).
  - Registrado `DemandaSpotModule` no `AppModule`.
- **Documentação**:
  - Item 3 marcado como concluído (tachado) em `docs/MVP/doc/Próximos passos.txt`.
