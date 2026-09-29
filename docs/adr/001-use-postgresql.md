# ADR 001: Use PostgreSQL

- Status: Accepted
- Context: AssetForge needs relational integrity across users, tenant membership, assets, versions, approvals, and audit records.
- Decision: Use PostgreSQL as the system of record and Prisma for typed database access and versioned migrations.
- Alternatives: A document database; a managed database with vendor-specific query APIs.
- Consequences: Transactions, unique constraints, and relational joins support core invariants. The team must manage migrations and tune indexes using actual query plans.
