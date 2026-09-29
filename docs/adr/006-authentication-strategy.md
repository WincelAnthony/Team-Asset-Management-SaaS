# ADR 006: Opaque Server-Side Sessions and Rotating Refresh Credentials

- Status: Accepted
- Context: The browser needs revocable sessions and safe refresh behavior without exposing long-lived credentials to JavaScript.
- Decision: Use Argon2id for passwords, opaque HttpOnly cookies, server-side session state, hashed refresh credentials, rotation, reuse detection, and CSRF/origin defenses for cookie-authenticated mutations.
- Alternatives: Long-lived JWTs in local storage; stateless JWT refresh tokens; third-party-only identity without a local session boundary.
- Consequences: Logout and revocation are immediate and tokens are not readable by browser scripts. Requests require session lookups and cookie-based CSRF controls must be implemented correctly.
