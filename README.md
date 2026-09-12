# AMI HUB CRM — Frontend first

This deliverable contains the Angular frontend only. It includes separate HTML, CSS, TypeScript and spec files for every component, dedicated business-feature routes, models and services, and reusable table/editor controls.

## First: review the frontend without a backend

1. Extract this ZIP.
2. Open `crmamihubfrontend-main` in VS Code.
3. Use Node.js 22.12+ (a version supported by Angular 21).
4. Run `npm ci`.
5. Run `npm run preview:ui`.
6. Open `http://localhost:4200`.

The labelled **UI preview · sample data** workspace opens with a sample Owner role. Use the header selector to inspect other roles. This is not authentication and is unavailable in the normal configuration. Preview changes are in-memory and reset on page reload. No payment is charged, no message is sent and no domain is renewed.

## Included frontend sections

| Main section | Screens / capabilities |
| --- | --- |
| Dashboard | Overview, today's work, upcoming reminders, activity |
| Sales | Leads, calls, follow-ups, meetings, itemized quotations |
| Customers | Profiles, visit count/history/purpose/outcome, payment promises, linked records |
| Projects | Projects, tasks, progress, team assignment and file links |
| Digital Marketing | Monthly content plans, content approval dates, campaigns, ad budget/spend, reported leads/conversions, individual client enquiries |
| People & HR | Employees, attendance, leave and workload |
| Accounts | Invoices, installments, payments, expenses, promises, recurring services, printable invoices and receipts |
| Support & Renewals | Tickets and yearly/domain/hosting renewal dates |
| Reports | Department summaries, collections, CSV export |
| Settings | User directory, services, departments and billing-profile details |

The reminder inbox is accessed from the header or dashboard. It does not add an eleventh sidebar section.

## Review these flows

- Customers → Customer visits: add a visit with purpose, customer, date, employee, outcome and next action. Customer profile shows linked visits.
- Accounts → Payment promises: add a promise against a customer/invoice. Promises alone never reduce the invoice balance. A recorded payment can reference a promise.
- Accounts → Payments: record an actual payment against an invoice and optional installment/visit/promise. View → Open receipt displays the print document.
- Accounts → Recurring services: review monthly maintenance and marketing fees. View → Create next service invoice creates a distinct invoice in preview and advances the service cycle; prior unpaid invoices remain outstanding. This is a manual action; automatic scheduled billing requires the backend job.
- Support & Renewals: record domain/hosting expiry, renewal amount and responsible employee. Renewal completion requires a new expiry date and is independent from payment collection.
- Digital Marketing → Ad campaigns: budgets, actual spend, reported leads and conversions show cost per lead and conversion rate. Individual enquiries are separate from reported totals, preventing double-counting, and separate from AMI HUB sales leads.
- Digital Marketing → Monthly plans: record plan preparation, customer-asset collection and monthly report deadlines. Content has approval/posting deadlines.
- Dashboard → All reminders: filter overdue/today/upcoming/unread and open the relevant record. Marking read does not mark a payment received or a service renewed.
- Settings → Billing profile: edit verified company/address/bank details before using printed documents.

## Invoices and PDF

Use **Open printable bill** or **Open receipt**, then **Print / Save as PDF**. This uses the browser's print-to-PDF workflow; it is not a server PDF-generation service. No tax-law compliance certification is implied. Configure applicable tax and verified business details before real use. Sample billing contact data is fictional.

## Normal API-connected configuration

`npm start` uses `/api` through `proxy.conf.json` (backend at localhost:5000). Email/password login obtains the role from the backend. `npm run build` creates the normal production configuration with `preview: false`.

Normal mode does not fall back to demo login/data if the backend fails. It shows loading, error/retry and save-error states. The new resource contracts and recurring-invoice endpoint must be implemented/verified in the backend before normal mode can support all screens. See `BACKEND-HANDOFF.md`.

Production output: `dist/amihub-crm/browser`. Serve with SPA fallback. Never deploy the preview build for live business use.

## Verification commands

- `npm test`: unit/contract tests.
- `npm run test:types`: TypeScript checks for specs.
- `npm run build`: production Angular/template compilation.
- `npx ng build --configuration preview`: compile the standalone UI preview.

Browser visual testing was attempted but the environment blocked access to the local preview. Desktop/mobile visual behavior and print layout therefore still need browser verification on your machine. Test success and build success do not make this a 100% production-ready CRM.

## Important limits

- This turn delivers frontend work only; backend changes are not packaged here.
- Reminders are derived in the UI while the workspace is open. Durable scheduled reminders, notification delivery and recurring invoice jobs require backend implementation.
- WhatsApp/email sending and Meta/Google automatic syncing are not enabled. Ad metrics use manual entry.
- File fields are links; real upload storage is not included.
- No live database, authentication-server, browser end-to-end, load, deployment or tax-compliance verification is claimed.
- API mode currently downloads permitted record pages into frontend memory for client filtering. Server-driven search/pagination and large-data performance validation remain necessary before a large deployment.
- Preview records are fictional. Real data must never be entered in preview mode.

See `FILE-STRUCTURE.md` for the full source file map.
