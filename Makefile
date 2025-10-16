# Makefile for PayPulse Web

# Variables
NPM = npm
NODE_MODULES = node_modules

# helper function to check prerequisites
define check_prereqs
	@command -v node >/dev/null 2>&1 || { echo "❌ Node.js is not installed. Please install it first."; exit 1; }
	@command -v npm >/dev/null 2>&1 || { echo "❌ npm is not installed. Please install it first."; exit 1; }
endef

# check if node_modules exists
define check_node_modules
	@if [ ! -d "$(NODE_MODULES)" ]; then \
		echo "⚠️  node_modules not found. Run 'make install' first."; \
		exit 1; \
	fi
endef

.PHONY: help install dev build start lint format format-check check-types

help:
	@echo "Available commands:"
	@echo "  make install        - install dependencies"
	@echo "  make dev            - start development server (Next.js + Turbopack)"
	@echo "  make build          - build project for production"
	@echo "  make start          - start production server"
	@echo "  make lint           - run ESLint"
	@echo "  make format         - format code with Prettier"
	@echo "  make format-check   - check formatting with Prettier"
	@echo "  make check-types    - run TypeScript type check"

install:
	$(call check_prereqs)
	$(NPM) install

dev:
	$(call check_prereqs)
	$(call check_node_modules)
	$(NPM) run dev

build:
	$(call check_prereqs)
	$(call check_node_modules)
	$(NPM) run build

start:
	$(call check_prereqs)
	$(call check_node_modules)
	$(NPM) run start

lint:
	$(call check_prereqs)
	$(call check_node_modules)
	$(NPM) run lint

format:
	$(call check_prereqs)
	$(call check_node_modules)
	$(NPM) run format

format-check:
	$(call check_prereqs)
	$(call check_node_modules)
	$(NPM) run format:check

check-types:
	$(call check_prereqs)
	$(call check_node_modules)
	$(NPM) run check-types
