## Template

Replace all instances of `typescript-template` with the name of your code repository.

To avoid port clashes when running multiple services locally, pick a unique pair of ports for this service before starting:

- Replace all instances of `4000` with a unique `4xxx` port for the app.
- Replace all instances of `15000` with a unique `15xxx` port for the database.

## Naming Convention

`file-name`, `folder-name`, `GLOBAL_CONSTANT_NAME`, `ExceptionName`, `ClassName`, `functionName`, `varName`

## Development

**Prerequisites**

- NodeJS
- Docker

**Start development environment**

- Create a `.env` file.
  - Refer to `.env.example` for the required environment variables.

- Install dependencies

```bash
npm i
```

- Start the app server and database in Docker

```bash
docker compose up -d
```

- View consolidated logs via Docker Compose

```bash
docker compose logs -f
```

- Shutdown app server and database

```bash
docker compose down
```

## Local URLs

**Node app**

```text
http://localhost:4000/
```

**Postgres database port**

```text
15000
```

## Database Migration

**Prerequisite**

- NodeJS
- Docker

**Start development environment**

- Start the development environment in Docker

```bash
docker compose up -d
```

**Update database schema**

- Generate migration

```bash
npm run migration-generate
```

- Apply migration

```bash
npm run migration-run
```

## Managing Dependencies

**Add a runtime dependency**

```bash
npm install <dependency-name>
```

**Add a development dependency**

```bash
npm install --save-dev <dependency-name>
```

**Remove a dependency**

```bash
npm uninstall <dependency-name>
```

**Update dependencies**

```bash
npm update
```

**Restart the app after changing dependencies**

After adding, removing, or upgrading dependencies, restart the app container.

```bash
docker compose restart app
```

## Auto-Format Code

```bash
npm run format
```

## Git Branching Guidelines

```mermaid
graph TD;
    A[main] -->|Branch Out| B[feature];
    B -->|Feature Completed| C[dev];
    C -->|Trigger CI/CD| D([Deploy to DEV Environment]);
    D -->|DEV Environment Tested| E[staging];
    E -->|Trigger CI/CD| F([Deploy to STAGING Environment]);
    E -->|STAGING Environment Tested| G[main];
    G -->|Create Tag| H{{new tag}};
    H -->|Trigger CI/CD| I([Deploy to PRODUCTION Environment]);
```
