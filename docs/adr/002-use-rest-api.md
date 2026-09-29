# ADR 002: Use a Separate REST API

- Status: Accepted
- Context: The product explicitly requires a separate backend and a portfolio-ready frontend/backend boundary.
- Decision: Use Next.js for the web application and NestJS for a versioned REST API with OpenAPI documentation.
- Alternatives: Next.js route handlers as the entire backend; GraphQL; RPC-only endpoints.
- Consequences: The API can serve clients independently and has a clear security boundary. The team must maintain API contracts and account for an additional deployed service.
