# Makefile for Kiwis Web

# ---------
# Binaries
# ---------
PM2 := pm2
NPM := npm
NODE_MODULES := node_modules

# ---------------------------------
# Prerequisite checks (reusable)
# ---------------------------------

# Ensure Node.js and npm exist
define check_prereqs
	@command -v node >/dev/null 2>&1 || { echo "Node.js not installed"; exit 1; }
	@command -v $(NPM) >/dev/null 2>&1 || { echo "npm not installed"; exit 1; }
endef

# Ensure dependencies are installed
define check_node_modules
	@if [ ! -d "$(NODE_MODULES)" ]; then \
		echo "node_modules not found. Run 'make install' first."; \
		exit 1; \
	fi
endef

# Ensure PM2 is available
define check_pm2
	@command -v $(PM2) >/dev/null 2>&1 || { echo "PM2 not installed"; exit 1; }
endef

# -----------------------------
# Phony targets
# -----------------------------
.PHONY: \
	help install dev build start lint prepare \
	format format-check check-types \
	pm2-start pm2-stop pm2-restart pm2-delete

# -----------------------------
# Help
# -----------------------------
help:
	@echo "Available commands:"
	@echo ""
	@echo "  make install        - install dependencies"
	@echo "  make dev            - start development server (Next.js + Turbopack)"
	@echo "  make build          - build project for production"
	@echo "  make start          - start production server"
	@echo ""
	@echo "  make lint           - run ESLint"
	@echo "  make prepare        - setup git hooks (husky)"
	@echo "  make format         - format code with Prettier"
	@echo "  make format-check   - check formatting with Prettier"
	@echo "  make check-types    - run TypeScript type check"
	@echo ""
	@echo "  make pm2-start      - start app using PM2"
	@echo "  make pm2-stop       - stop app using PM2"
	@echo "  make pm2-restart    - restart app using PM2"
	@echo "  make pm2-delete     - remove app from PM2"
	@echo ""

# -----------------------------
# Core commands
# -----------------------------
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

prepare:
	$(call check_prereqs)
	$(NPM) run prepare

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

# -----------------------------
# PM2 management
# -----------------------------
pm2-start:
	$(call check_prereqs)
	$(call check_pm2)
	$(NPM) run build
	$(NPM) run pm2:start

pm2-stop:
	$(call check_prereqs)
	$(call check_pm2)
	$(NPM) run pm2:stop

pm2-restart:
	$(call check_prereqs)
	$(call check_pm2)
	$(NPM) run pm2:restart

pm2-delete:
	$(call check_prereqs)
	$(call check_pm2)
	$(NPM) run pm2:delete
