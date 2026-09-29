# AssetForge Project Plan

## Discovery (Phase 0)

- The supplied workspace was empty: no source files, package manifests, configuration, or Git metadata were present.
- Node.js `v24.13.0`, npm `11.6.0`, pnpm `10.19.0`, and Git `2.52.0.windows.1` are available in the environment.
- Docker is not installed or available on PATH. Compose services can be described, but container startup cannot be verified here.
- No existing package manager or framework conventions need to be preserved. Use pnpm workspaces for the monorepo.
- Scope follows the supplied request through Phase 2: discovery, architecture, and the initial infrastructure foundation. Business feature implementation is a later phase.

## Delivery Phases

### Phase 0 — Discovery

- Inspect the repository, tooling, and environment constraints.
- Record findings and a phased implementation plan here before implementation.

### Phase 1 — Architecture

- Define the monorepo boundaries for the Next.js web app, NestJS API, and background worker.
- Decide the tenant isolation model, authentication/session approach, relational data ownership, object storage flow, and queue flow.
- Document system/component diagrams, tradeoffs, security boundaries, and database planning assumptions.
- Add architecture decision records for PostgreSQL, REST, object storage, Redis queues, tenant isolation, and authentication.

### Phase 2 — Infrastructure Foundation

- Add pnpm workspace configuration and strict shared TypeScript, lint, and format configuration.
- Add minimal web, API, and worker application entry points and scripts.
- Add local PostgreSQL, Redis, and MinIO Compose services, persistent volumes, and health checks.
- Add an environment example and startup validation without committing secrets.
- Add a GitHub Actions foundation for install, lint, typecheck, and build.
- Validate repository configuration and run available checks. Container startup remains unverified until Docker is available.

### Phase 3 — Identity and Organization Core

- Add Prisma schema and migrations for users, organizations, memberships, sessions, refresh tokens, and invitations.
- Implement registration, login, refresh rotation, logout, password reset/verification architecture, RBAC, and tenant context.
- Add API and database integration coverage for authorization and tenant isolation.

### Phase 4 — Asset Storage and Processing

- Add signed S3-compatible uploads, asset metadata, idempotency, checksums, and queue-backed processing.
- Add worker retries, failure handling, file signature checks, and safe preview generation.
- Add integration coverage for upload failure, duplicate requests, and cross-tenant access.

### Phase 5 — Collaboration and Governance

- Add folders, tags, search, comments, versioning, approval transitions, notifications, and audit logging.
- Protect concurrent version creation and approval transitions with transactions and database constraints.
- Add dashboard/report queries with pagination and deliberate indexes.

### Phase 6 — Product UX and Operations

- Build accessible web flows for authentication, organization management, asset browsing, review, and settings.
- Add health endpoints, structured logging, request IDs, security headers, rate limiting, and operational documentation.
- Add comprehensive unit, integration, and Playwright end-to-end coverage.

### Phase 7 — Production Readiness

- Complete security, performance, deployment, and AI-development documentation.
- Run measured benchmarks, CI, migrations, seed workflows, and the Docker environment.
- Review backup/restore, secrets, storage lifecycle, observability, and deployment procedures.

## Current Exit Criteria

- Phase 0 discovery and plan are documented.
- Phase 1 architecture and ADRs are documented.
- Phase 2 repository configuration and service definitions are present.
- Lint/typecheck/build checks are run where dependencies and environment permit; inability to run Docker is reported explicitly.
