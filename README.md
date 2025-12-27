# Kiwis.Club

AI-powered insights from your email — see upcoming payments, fully private.

## What this is

- Kiwis.Club connects to your email and extracts **upcoming payment signals**
  (subscriptions & recurring charges).
- Built minimal, opinionated, and production-focused.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/) + [Prisma](https://www.prisma.io/)
- [Better Auth](https://better-auth.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Local Development

### Prerequisites

- Node.js `24.12.0`
- Yarn
- PostgreSQL

### Install

```bash
make install
```

### Environment

Copy the example env file and fill in values:

```bash
cp .env.example .env
```

### Run (Makefile)

Common dev tasks are wrapped via `Makefile`:

```bash
make install   # install dependencies
make dev       # start local dev server
make build     # production build
make start     # start prod server
make lint      # run eslint
make format    # run prettier
```

App runs on `http://localhost:3000`

## Production

Install dependencies:

```bash
make install
```

Build the application:

```bash
make build
```

Start the application with PM2:

```bash
pm2 start npm --name "kiwis-web" -- start
```

Ensure all required environment variables from `.env.example`
are configured in the production environment.

## Conventions

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
- [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

## Legal

- Privacy Policy: https://kiwis.club/privacy
- Terms of Service: https://kiwis.club/terms

## Collaborators

- **Sai Vipul Mohan V**
  - GitHub: https://github.com/vipul43
  - Mail: saifunny43@gmail.com

- **Hassain Saheb Sk**
  - GitHub: https://github.com/hafeezzshs
  - Mail: hafeezz.dev@gmail.com

## License

See [LICENSE](./LICENSE)
