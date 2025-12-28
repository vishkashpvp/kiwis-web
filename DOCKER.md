# Docker Setup for Kiwis Web

This setup provides Docker configuration for `kiwis-web` (Next.js) application using its existing Makefile.

## Prerequisites

- Docker installed

## kiwis-web (Next.js)

### Setup and Build:

```bash
# Copy and configure environment file
cp .env.example .env
# Edit .env with your actual values

# Build the Docker image
docker build -t kiwis-web .

# Run the container
docker run -p 3000:3000 --env-file .env kiwis-web
```

**Access**: http://localhost:3000

### How it works:
- Uses `make install` to install dependencies
- Uses `make build` to build the production app
- Uses `make start` to run the server

## Development vs Docker

### For Development (recommended):
Use the Makefile directly on your host machine for hot reload:

```bash
# Web development server
make dev
```

### For Production/Testing:
Use Docker for consistent deployment:

```bash
# Build and run web
docker build -t kiwis-web .
docker run -p 3000:3000 --env-file .env kiwis-web
```

## Database

The kiwis-web application requires a PostgreSQL database for Prisma ORM. You can:

1. **Use a local PostgreSQL installation**
2. **Use a cloud database** (AWS RDS, Supabase, etc.)
3. **Run PostgreSQL in Docker**:
   ```bash
   docker run -d \
     --name kiwis-postgres \
     -e POSTGRES_DB=kiwis_db \
     -e POSTGRES_USER=kiwis_user \
     -e POSTGRES_PASSWORD=kiwis_password \
     -p 5432:5432 \
     postgres:15-alpine
   ```
   Then set `DATABASE_URL=postgresql://kiwis_user:kiwis_password@localhost:5432/kiwis_db` in your .env

## Database Migrations

To run Prisma migrations:

```bash
# If using local development
npx prisma migrate deploy

# If web is running in Docker, you can exec into it
docker exec -it <container-name> npx prisma migrate deploy

# Generate Prisma client
docker exec -it <container-name> npx prisma generate
```

## Useful Commands

```bash
# View container logs
docker logs <container-name>

# View live logs
docker logs -f <container-name>

# Stop a running container
docker stop <container-name>

# Remove containers and images
docker rm <container-name>
docker rmi kiwis-web

# Rebuild after code changes
docker build -t kiwis-web . --no-cache

# Run container in background
docker run -d -p 3000:3000 --env-file .env --name kiwis-web-container kiwis-web
```

## Environment Variables

### .env
Configure your Next.js environment variables:

```env
# Database (Required for Prisma)
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# Authentication
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# OAuth Providers (if using)
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

## Troubleshooting

- **Port conflicts**: Change the `-p` port mappings if 3000 is already in use
- **Build failures**: Ensure your Makefile works locally first: `make install && make build`
- **Database connection issues**: Verify your `DATABASE_URL` in .env points to an accessible PostgreSQL instance
- **Container not starting**: Check logs with `docker logs <container-name>` to see error messages
- **Prisma issues**: Make sure to run `npx prisma generate` after any schema changes