# ---------- Build stage ----------
# Use official Node.js 20 image based on Alpine Linux
# This stage is ONLY for building the app
FROM node:20-alpine AS builder

# Alpine images do not guarantee `make` is present
# Since our workflow depends on Makefile, we install make explicitly
RUN apk add --no-cache make

# Set working directory inside the container to /app
# All following commands will run from this directory
WORKDIR /app

# Copy only package.json / package-lock.json first
# This helps Docker cache dependency installation
COPY package*.json ./

# Copy Makefile because we will use `make install` and `make build`
COPY Makefile ./

# Install node dependencies using Makefile abstraction
# Internally this runs `npm install`
RUN make install

# Now copy the rest of the application source code
# This includes Next.js code, configs, etc.
COPY . .

# Build the production-ready app
# Internally this runs `npm run build`
RUN make build

# ---------- Runtime stage ----------
# Fresh Node.js image for running the app
# No build tools or temp files from previous stage
FROM node:20-alpine

# `make` is required again because container startup uses `make start`
RUN apk add --no-cache make

# Set working directory again
WORKDIR /app

# Copy everything needed from the builder stage
# Includes built files, node_modules, configs
COPY --from=builder /app ./

# Document that the app listens on port 3000
# (Next.js default production port)
EXPOSE 3000

# Default command when the container starts
# Internally runs `npm run start`
CMD ["make", "start"]