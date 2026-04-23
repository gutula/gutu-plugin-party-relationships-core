# Party & Relationships Core TODO

**Maturity Tier:** `Hardened`

## Shipped Now

- Exports 3 governed actions: `party.parties.create`, `party.parties.merge`, `party.roles.activate`.
- Owns 3 resource contracts: `party.parties`, `party.contacts`, `party.relationships`.
- Publishes 2 job definitions with explicit queue and retry policy metadata.
- Publishes 1 workflow definition with state-machine descriptions and mandatory steps.
- Adds richer admin workspace contributions on top of the base UI surface.
- Ships explicit SQL migration or rollback helpers alongside the domain model.
- Documents 6 owned entity surface(s): `Party`, `Party Role Facet`, `Contact`, `Address`, `Relationship Hierarchy`, `Bank Account Reference`.
- Carries 4 report surface(s) and 3 exception queue(s) for operator parity and reconciliation visibility.
- Tracks ERPNext reference parity against module(s): `CRM`, `Selling`, `Buying`.
- Operational scenario matrix includes `party-onboarding`, `party-deduplication-merge`, `customer-supplier-cross-role-activation`.
- Governs 3 settings or policy surface(s) for operator control and rollout safety.

## Current Gaps

- Repo-local documentation verification entrypoints were missing before this pass and need to stay green as the repo evolves.

## Recommended Next

- Deepen dedupe, survivorship, and merge safety before more downstream commercial and financial plugins depend on party truth.
- Add stronger hierarchy, KYC, and localization-aware contact governance as onboarding depth increases.
- Broaden lifecycle coverage with deeper orchestration, reconciliation, and operator tooling where the business flow requires it.
- Add more explicit domain events or follow-up job surfaces when downstream systems need tighter coupling.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `Customer`, `Supplier`, `Lead`.

## Later / Optional

- Outbound connectors, richer analytics, or portal-facing experiences once the core domain contracts harden.
