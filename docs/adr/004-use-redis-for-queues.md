# ADR 004: Use Redis and BullMQ for Background Work

- Status: Accepted
- Context: File inspection, previews, and notifications are asynchronous and need retry/backoff behavior.
- Decision: Use Redis with BullMQ for worker queues and a PostgreSQL outbox for reliable publication of committed work.
- Alternatives: In-process tasks; a hosted message broker; PostgreSQL polling without a queue.
- Consequences: Workers can scale separately and jobs can retry. Redis is an operational dependency; job handlers must be idempotent, and terminal failures need an operator-visible path.
