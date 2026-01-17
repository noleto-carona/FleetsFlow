## Ajustes do Prisma alinhados à Operação Narrada – Fleets Flow

Este arquivo registra os principais ajustes (já aplicados ou planejados) no `schema.prisma` para aderir melhor ao fluxo descrito em **OPERAÇÃO NARRADA SIMULADA**.

### Checklist rápido de status

- ~~Tripulação e documentos de tripulação mapeados no `schema.prisma` e já migrados para o PostgreSQL~~
- ~~Chat seguro de negociação (thread + mensagens) mapeado no `schema.prisma` e já migrado para o PostgreSQL~~
- Itens de chave operacional histórica e eventos estruturados de operação/geofencing ainda pendentes de implementação

### 1. Tripulação e documentos de tripulação

Objetivo: refletir o eixo de compliance da **tripulação** (além de empresa e embarcações).

Modelos adicionados ao `backend/prisma/schema.prisma`:

- Relacionamento em `Empresa`:
  - `tripulantes Tripulante[]`
- Novo modelo `Tripulante` (ligado a `Empresa`):
  - Campos principais: `nome`, `cpf` (único), `funcao`, `registroProfissional`, `ativo`, `createdAt`.
  - Relações:
    - `empresa` → `Empresa` (FK `empresa_id`).
    - `documentos` → `TripulanteDocumento[]`.
  - Tabela física: `tripulantes`.
- Novo modelo `TripulanteDocumento`:
  - Campos principais: `tripulanteId`, `tipo`, `arquivoUrl`, `status` (`DocStatus`), `dataValidade`, `observacao`, `validadoEm`, `createdAt`.
  - Relações:
    - `tripulante` → `Tripulante` (FK `tripulante_id`).
  - Índices em `tripulanteId` e `status`.
  - Tabela física: `tripulante_documentos`.

Com isso, o backend passa a conseguir representar documentos da tripulação de forma estruturada e auditável, em linha com o módulo de Compliance Antecipado descrito na narrativa.

### 2. Chat seguro de negociação

Objetivo: suportar o **chat criptografado de negociação/ajustes** que ocorre após o aceite do match (antes e durante o contrato), garantindo histórico auditável.

Modelos adicionados ao `schema.prisma`:

- Relacionamentos:
  - Em `Perfil`:
    - `mensagensEnviadas ChatMensagem[]`
  - Em `Match`:
    - `chatThread ChatThread?`
- Novo modelo `ChatThread`:
  - Campos: `id`, `matchId` (único), `createdAt`.
  - Relações:
    - `match` → `Match` (FK `match_id`).
    - `mensagens` → `ChatMensagem[]`.
  - Tabela física: `chat_threads`.
- Novo modelo `ChatMensagem`:
  - Campos: `id`, `threadId`, `autorPerfilId`, `conteudo`, `anexos` (Json), `createdAt`.
  - Relações:
    - `thread` → `ChatThread` (FK `thread_id`).
    - `autor` → `Perfil` (FK `autor_perfil_id`).
  - Índices em `threadId` e `autorPerfilId`.
  - Tabela física: `chat_mensagens`.

Esse conjunto permite que cada `Match` possua um canal de comunicação próprio, com mensagens ligadas a perfis específicos, pronto para ser usado tanto na fase de negociação quanto em anotações operacionais vinculadas ao contrato.

### 3. Itens sugeridos para futuro (ainda não implementados no schema)

Estes pontos foram identificados como desejáveis para aproximar ainda mais o modelo da narrativa, mas **ainda não foram aplicados** no `schema.prisma`:

- Histórico de **chaves operacionais**:
  - Modelo dedicado `ChaveOperacional`, linked a `Perfil`, para registrar múltiplas chaves emitidas ao longo do tempo (ATIVA, REVOGADA, EXPIRADA), mantendo em `Perfil` apenas a chave atual.
  - O contrato já armazena `hashChave`, então o próximo passo seria conectar isso com a tabela histórica.
- Eventos estruturados de **operação/geofencing**:
  - Modelo `OperacaoEvento` ligado a `Operacao` com campos como `tipo`, `payload` (Json), `createdAt`, permitindo linha do tempo de eventos (INICIO, ENTRADA_AREA, SAIDA_AREA, DESVIO_ROTA, ATRASO etc.).
  - Os campos `logs` e `alertas` em `Operacao` podem ser mantidos como agregados/resumos.

Esses itens ficam como backlog técnico para quando for o momento de aprofundar a parte de auditoria fina e rastreabilidade temporal das chaves e das operações.

