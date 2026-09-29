# Security Review (Initial Foundation)

## Status

This is a threat model and implementation plan, not a claim that the product is production-secure. Authentication, tenant authorization, uploads, persistence, and rate limiting are not implemented in the Phase 2 scaffold.

## Trust boundaries

- Browser input is untrusted, including organization IDs, asset metadata, filenames, MIME types, and upload completion claims.
- The API is the authorization boundary. It must derive tenant context from an authenticated membership and scope every resource query.
- PostgreSQL, Redis, and object storage are private infrastructure; credentials must be supplied through a secret manager outside local development.
- Worker job payloads are untrusted references and must be revalidated against database state and tenant ownership.

## Threat model

| Threat                                   | Planned mitigation                                                                                                                   | Verification                                                             |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| Cross-tenant asset read or mutation      | Derive organization context from membership; tenant-scoped lookups; tenant-aware foreign keys and policy helpers                     | Integration tests use known foreign-tenant IDs for every resource family |
| Session theft or refresh replay          | HttpOnly/Secure/SameSite cookies, hashed rotating credentials, reuse detection, session revocation, CSRF/origin checks               | Auth tests for expiry, rotation, replay, logout, and mutation CSRF       |
| Privilege escalation                     | Central role/action policies; validate role assignment authority server-side                                                         | Tests cover each role and prohibited role transitions                    |
| Malicious file upload                    | Size/type allowlists, signature inspection, quarantine, private storage, safe preview generation, malware scanning integration point | Tests with spoofed MIME, malformed, oversized, and hostile files         |
| Duplicate or concurrent state changes    | Idempotency records, transactions, unique constraints, compare-and-set state transitions                                             | Retry and race tests for upload, versions, and approvals                 |
| Credential brute force                   | Redis-backed rate limiting, generic login errors, bounded password reset behavior                                                    | Rate limit and enumeration tests                                         |
| Secret or personal data exposure in logs | Structured allowlisted fields; redact cookies, credentials, signed URLs, and file contents                                           | Logging tests and log-field review                                       |
| API abuse and browser attacks            | Strict validation, security headers, exact credentialed CORS origin, CSRF protection                                                 | Security headers, malformed request, CORS, and CSRF tests                |

## Current controls

- Nest scaffold installs Helmet and allows credentialed CORS only for the configured web origin.
- Global request validation is configured with transformation, a whitelist, and rejection of unknown fields.
- Local Compose ports bind to loopback and use development-only credentials.
- `.env` is Git-ignored, while `.env.example` contains no production secrets.

These controls are a baseline and do not replace endpoint-level authorization, secure session handling, or a complete security review.
