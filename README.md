# Webhook Inspector

Ferramenta para capturar e inspecionar requisições webhook em tempo real.

## Tecnologias

**Backend**
- [Fastify](https://fastify.dev/) — framework web rápido e leve
- [Drizzle ORM](https://orm.drizzle.team/) — ORM TypeScript para PostgreSQL
- [Zod](https://zod.dev/) — validação de schemas e variáveis de ambiente
- [Scalar](https://scalar.com/) — documentação interativa da API (OpenAPI)
- TypeScript, PostgreSQL, UUIDv7

**Frontend**
- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- TypeScript

**Tooling**
- [Biome](https://biomejs.dev/) — formatter e linter
- [PNPM](https://pnpm.io/) — gerenciador de pacotes (monorepo)
- Docker — banco de dados local

## Pré-requisitos

- Node.js 20+
- PNPM 10+
- Docker

## Instalação

1. Clone o repositório e instale as dependências:

```bash
git clone <repo-url>
cd webhook-inspector
pnpm install
```

2. Configure as variáveis de ambiente da API:

```bash
cp api/.env.example api/.env
```

Edite `api/.env` com suas configurações:

```env
DATABASE_URL="postgresql://docker:docker@localhost:5432/webhooks"
PORT=3333
```

3. Suba o banco de dados:

```bash
docker compose -f api/docker-compose.yml up -d
```

4. Execute as migrations:

```bash
pnpm --filter api db:migrate
```

## Uso

Inicie a API e o frontend em terminais separados:

```bash
# API (porta 3333)
pnpm --filter api dev

# Frontend (porta 5173)
pnpm --filter web dev
```

### Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/webhooks` | Lista webhooks capturados |

Parâmetros de query:
- `limit` — quantidade de resultados (1–100, padrão: `20`)

Documentação interativa disponível em `http://localhost:3333/docs`.

### Utilitários de banco

```bash
pnpm --filter api db:generate  # gerar migrations
pnpm --filter api db:migrate   # aplicar migrations
pnpm --filter api db:studio    # abrir Drizzle Studio
```
