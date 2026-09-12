# Access modes

Normal mode uses backend email/password authentication, server-returned roles, frontend route/action/assignment restrictions and session restore/logout. See `BACKEND-HANDOFF.md`. The backend must enforce the same rules independently.

`npm run preview:ui` is an explicitly labelled sample-data configuration with a role switcher. It cannot authenticate real users. The normal configuration has `preview: false` and never uses this as a fallback.

Owner/Admin has broad UI access; Sales handles sales/customer visits/promises, Telecaller handles assigned calls/leads, delivery staff handle assigned work, Marketing handles assigned plans/campaigns, HR manages people with read-only delivery access, Accounts handles billing/collections, and Support handles assigned tickets/renewals. Exact grants are in `core/models/permissions.model.ts`.

No production readiness, live authentication test or browser end-to-end test is claimed by this package.
