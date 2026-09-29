# ADR 003: Store Asset Files in Object Storage

- Status: Accepted
- Context: Digital assets can be large and should not consume relational database storage or API memory unnecessarily.
- Decision: Store binaries in private S3-compatible object storage. Use short-lived signed upload/download URLs and keep metadata in PostgreSQL.
- Alternatives: Store files in PostgreSQL; proxy all bytes through the API; use a provider-specific storage API.
- Consequences: Uploads scale independently from API compute and MinIO supports local development. The system must reconcile interrupted upload intents and validate untrusted file content asynchronously.
