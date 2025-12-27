# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.9.0] - 2025-12-28

### Added

- First official public release of Kiwis.Club.
- Public landing page with product description and Google sign-in.
- Google OAuth authentication with optional Gmail read-only permission.
- Authenticated dashboard experience.
  - Conditional prompt to link Gmail when permission is not granted.
  - Payments table showing merchant, amount, date, and status once Gmail is linked.
  - Profile link shown after Gmail is linked.
  - Sign-out action always available.
- Profile page with view-only user details (name, email, avatar).
- Footer on authenticated pages displaying:
  - Theme toggle (light / dark / system)
  - Application name
  - Application version
- Privacy Policy and Terms & Conditions pages.

### API

- `GET /api/payments`
  - Returns paginated payment data.
  - Supports `limit`, `page`, `status`, and `recurrence` query parameters.
- `GET /api/payments/[id]`
  - Returns details for a single payment by ID.
- Route protection via middleware:
  - Unauthorized API access returns `401`.
  - Unauthorized page access redirects to the landing page.

### Internal

- Authentication and session management handled by Better Auth.
- Prisma ORM with Postgres for database access.
- Type-safe environment variable validation using `@t3-oss/env-nextjs`.
- Makefile for common development workflows.
- Code quality tooling:
  - Prettier for formatting.
  - ESLint for linting.
  - Husky and lint-staged for pre-commit checks.
- Open Graph image generation for social sharing.

### Notes

- This is the **first official release**.
- Earlier versions were internal development and deployment checks only.
- The application is currently read-only; users cannot create, edit, or delete data.
