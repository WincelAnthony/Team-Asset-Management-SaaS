# ADR 005: Shared Schema with Explicit Tenant Keys

- Status: Accepted
- Context: Users can join multiple organizations and every organization-owned record needs reliable isolation.
- Decision: Use shared PostgreSQL tables with required `organizationId` columns, tenant-aware relations, validated membership context, and mandatory scoped repository/service methods. Add database constraints and optional row-level security as defense in depth.
- Alternatives: Database-per-tenant; schema-per-tenant; relying only on frontend filtering.
- Consequences: Shared schema keeps migrations and operations manageable. Every resource query and mutation requires tenant context, and automated cross-tenant tests are release gates.
