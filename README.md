# FleetsFlow

Plataforma de gestão de frotas e operações marítimas.

## Como configurar o ambiente

Este guia ajudará você a configurar o ambiente de desenvolvimento localmente.

### Pré-requisitos
- **Node.js** (v18 ou superior recomendado)
- **Docker** & **Docker Compose** (para banco de dados PostgreSQL e Redis)
- **Git**

### 1. Clonar o Repositório

```bash
git clone https://github.com/FleetsFlowRW/FleetsFlow.git
cd FleetsFlow
```

### 2. Configurar o Backend (NestJS)

1. Acesse a pasta do backend:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz da pasta `backend/`.
   - Adicione o seguinte conteúdo (baseado no `docker-compose.yml` padrão):
     ```env
     DATABASE_URL="postgresql://admin:secret@localhost:5432/fleetsflow?schema=public"
     ```

4. Inicie os serviços de infraestrutura (Banco de Dados e Redis):
   ```bash
   docker-compose up -d
   ```

5. Execute as migrações do banco de dados (Prisma):
   ```bash
   npx prisma migrate dev
   ```

6. Inicie o servidor backend em modo de desenvolvimento:
   ```bash
   npm run start:dev
   ```
   O backend estará rodando em `http://localhost:3000` (ou porta configurada).

### 3. Configurar o Frontend (Vite/React)

1. Abra um novo terminal e acesse a pasta do frontend:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie a aplicação frontend:
   ```bash
   npm run dev
   ```
   O frontend estará acessível geralmente em `http://localhost:5173`.

### Observações Importantes
- **Arquivos Ignorados**: As pastas `node_modules`, `dist`, `build` e arquivos `.env` são ignorados pelo Git para segurança e performance. Certifique-se de criar seus próprios arquivos `.env` locais.
- **Backup**: Existe um script `backup_project.bat` na raiz para realizar backups locais manuais se necessário.
