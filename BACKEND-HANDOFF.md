# Frontend API handoff

## Authentication

`POST /api/auth/login` accepts `{email,password}` and returns `{user:{id,employeeId,name,email,role}}` with a secure server-managed HttpOnly session cookie. `GET /api/auth/me` restores the same user. `POST /api/auth/logout` revokes it. Same-origin `/api` supports Angular XSRF cookie/header handling. Roles must be verified server-side; never trust a role selector or client claims.

## Workspace data

`GET /api/bootstrap` returns `{resources:string[],directory:[{id,name}],projectDirectory:[{id,projectName,customerId}],invoiceDirectory:[{id,invoiceNumber,customerId}],activity:[{text,actor,date}]}`. Each lookup must contain only records/fields authorized for the user. A sales user may need a limited invoice lookup for payment promises; this is not permission to read the full Accounts module.

`GET /api/:resource?page=1&pageSize=200` returns `{items,page,pageSize,total}`.
`POST /api/:resource` creates a record; `PATCH /api/:resource/:id` updates it. Both return `{record}`. Updates include `expectedRevision`.
`DELETE /api/:resource/:id?revision=N` deletes an allowed record. Enforce linked-record protection and accounting retention server-side.

Existing resources: leads, calls, followups, meetings, quotations, customers, projects, tasks, files, plans, content, employees, attendance, leave, invoices, installments, payments, expenses, tickets, renewals, users, services, departments.

New frontend resources: visits, promises, subscriptions, campaigns, campaignLeads, billingProfile. Their field/status definitions and model interfaces are in their feature folders.

`POST /api/leads/:id/convert` must atomically create at most one customer for a Won lead and return `{record:customer}`.
`POST /api/subscriptions/:id/invoice` must atomically create at most one invoice for a service cycle, advance the next invoice date and return `{record:invoice}`. Advancing the cycle must not delete prior unpaid invoices. The frontend action does not provide an automatic recurring job.

## Business rules to enforce on the server

- Maintain immutable activity history and permission checks on every endpoint and record.
- Calculate invoice totals, payment balances, installments, promise fulfillment and reporting totals authoritatively. Use transactions/idempotency for payment and recurring invoice mutations.
- Keep payment promises distinct from actual receipts.
- Link invoice customer, payment invoice, installment invoice, visit customer, promise customer/invoice and campaign enquiry/customer consistently; reject mismatched links.
- Keep service charges separate from advertising budgets. Do not add individual enquiry counts to manually reported campaign totals.
- Bind assignments to employee/user IDs; frontend sample data uses demonstration IDs only.
- A domain payment is not renewal completion. A new verified expiry date starts the next reminder cycle.
- Renewal UI reminder windows are 30/15/7/due/overdue. Other scheduled UI reminders use seven days/due/overdue. Persistent delivery, retry cadence and user-configurable timing require backend settings/jobs.
- Payment-received events should notify Owner/Admin and Accounts. Only authorized recipients receive customer or financial details.

## External work still required

Live database integration of all new resources, secure account administration, file storage, reliable scheduled jobs, provider integrations (WhatsApp/email/Meta/Google), monitoring, backup/restore, and deployment verification. Frontend source alone cannot complete these.
