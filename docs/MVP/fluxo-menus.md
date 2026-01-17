## Fluxo por Menu Principal - FleetsFlow

### 1. Dashboard
- **Objetivo**: visão rápida do estado geral da PME dentro do ecossistema Fleet Flow.
- **Blocos principais**:
  - Status da **Chave Operacional** (ativa, em risco, suspensa), com percentual de compliance atual.
  - Cards de **operações ativas hoje** (quantidade, tipo, portos envolvidos).
  - Lista de **próximos vencimentos críticos** (documentos da empresa, embarcações, tripulação).
  - Mini-mapa ou widget de **operações em andamento** (resumo do módulo de Operações).
  - Indicadores rápidos: faturamento estimado do mês (contratos em escrow), N operações concluídas, score operacional.
- **Ações rápidas**:
  - Atalho para **subir novos documentos** (vai para Compliance).
  - Atalho para **ver marketplace** (novas demandas spot).
  - Atalho para **abrir operações ativas**.

### 2. Compliance
- **Objetivo**: ser o coração do “Compliance Antecipado”, onde a documentação vira chave operacional.
- **Blocos principais**:
  - Wizard/resumo de **onboarding jurídico** da PME (status: completo, pendente, em análise).
  - Área de **upload em lote** de documentos (empresa, embarcações, tripulação).
  - Tabela por aba:
    - Empresa (contratos sociais, certidões, seguros, etc.).
    - Embarcações (classe, segurança, ambientais, seguros).
    - Tripulação (certificados individuais, habilitações).
  - Para cada documento: tipo, status (válido/pendente/inválido), data de vencimento, impacto na chave.
  - Indicador de **percentual de conformidade** geral e por categoria (Empresa / Frota / Tripulação).
  - Destaque da **Chave Operacional Amarela**: emitida ou não, hash, data de emissão, histórico de alterações.
- **Ações principais**:
  - Subir/atualizar documentos.
  - Solicitar revisão / reprocessamento de IA.
  - Ver histórico de validações e logs de auditoria documental.

### 3. Marketplace
- **Objetivo**: ser o “Uber dos Mares” para a PME – receber e gerenciar chamadas spot.
- **Blocos principais** (visão PME prestadora de serviço):
  - Lista de **chamadas disponíveis** (quando habilitada pela chave):
    - Tipo de operação, região/porto, janela de tempo, requisitos técnicos, nível de risco.
    - Preço e contratante ainda ocultos até o aceite.
  - Aba de **chamadas aceitas** em preparação (pré-operação).
  - Aba de **histórico de chamadas** (ganhas, recusadas, expiradas).
- **Detalhe de uma chamada**:
  - Resumo dos requisitos técnicos e regulatórios.
  - Embacações elegíveis da frota da PME (com score técnico).
  - Linha do tempo: prazo para resposta, janela de operação.
- **Ações principais**:
  - **Aceitar** chamada (dispara revelação de preço, contratante e bloqueio da embarcação).
  - **Recusar** com motivo opcional.
  - Ver link para o **chat seguro** após aceite (conectado ao módulo Operações/Contratos).

### 4. Operações
- **Objetivo**: acompanhar a execução das operações spot em tempo real, com foco em AIS e geofencing.
- **Blocos principais**:
  - Lista de **operações ativas** (status: em trânsito, em operação, finalização).
  - Radar/mapa com **posicionamento AIS** das embarcações envolvidas.
  - Indicadores por operação: ETA, porto destino, marcos atingidos (início, entrada em área, saída, conclusão).
  - Alertas em tempo real:
    - Aproximação de área.
    - Entrada em zona sensível.
    - Desvio de rota.
    - Atrasos relevantes.
  - Acesso ao **chat operacional** e anexos (comandos, instruções, registros de evento).
- **Ações principais**:
  - Abrir detalhe de uma operação específica (linha do tempo + mapa + documentos associados).
  - Registrar eventos ou observações pós-fato (casos de incidentes, quase acidentes, restrições).

### 5. ESG
- **Objetivo**: consolidar o impacto ambiental e social da operação da PME dentro da plataforma.
- **Blocos principais** (ao longo do tempo):
  - Gráficos de **indicadores ESG** por período (mês, trimestre, ano).
  - Métricas derivadas das operações:
    - Consumo estimado / emissões associadas por tipo de viagem (quando disponível).
    - Taxa de incidentes / não conformidades operacionais.
    - Cumprimento de janelas e rotas seguras.
  - Indicadores qualitativos: aderência a normas, participação em operações de baixo impacto, certificados verdes.
- **Ações principais**:
  - Exportar resumo ESG para relatórios externos.
  - Filtrar por porto, tipo de serviço, embarcação.

### 6. Relatórios
- **Objetivo**: ser o “arquivo inteligente” da PME – histórico consolidado e exportável.
- **Tipos de relatórios sugeridos**:
  - **Operacionais**:
    - Lista de operações concluídas, com datas, portos, embarcações, status final.
    - Tempo médio de operação, cancelamentos, desvios.
  - **Financeiros**:
    - Valores de contratos por período.
    - Situação de pagamentos (liberados, pendentes, disputas).
    - Projeções simples com base no pipeline em escrow.
  - **Compliance**:
    - Documentos vencidos, a vencer, e histórico de regularizações.
    - Linha do tempo da **Chave Operacional** (ativada, em risco, suspensa, retomada).
  - **Auditoria**:
    - Logs de aceite de chamadas.
    - Assinaturas eletrônicas vinculadas a contratos específicos.
    - Registros de geofencing e eventos críticos da operação.
- **Ações principais**:
  - Filtrar por período, tipo de relatório, embarcação, porto, contratante.
  - Exportar em PDF/CSV.

### 7. Perfil
- **Objetivo**: centralizar configuração de identidade, segurança e preferências da PME e dos usuários.
- **Blocos principais**:
  - **Perfil da Empresa**:
    - Razão social, CNPJ, endereço, contatos, responsável legal.
    - Status de verificação e vínculo com a Chave Operacional.
  - **Certificados Digitais**:
    - Gerenciamento do certificado ICP-Brasil (upload, validade, teste de assinatura).
  - **Usuários e Permissões** (quando multiusuário):
    - Lista de usuários internos, papéis (admin, operacional, financeiro).
  - **Preferências**:
    - Notificações (email, push, alertas de vencimento, alertas operacionais).
    - Idioma, fuso horário, preferências de visualização de mapa.
- **Ações principais**:
  - Atualizar dados cadastrais.
  - Gerenciar certificados e permissões.
  - Configurar notificações e parâmetros padrão da conta.

