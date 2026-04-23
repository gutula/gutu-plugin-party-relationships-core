# Party & Relationships Core Developer Guide

Canonical party, contact, address, relationship, and role-facet records for customer, supplier, prospect, and multi-role business identity flows.

**Maturity Tier:** `Hardened`

## Purpose And Architecture Role

Provides the canonical external-party, contact, address, and relationship write model so every business plugin can compose around one governed business identity spine.

### This plugin is the right fit when

- You need **party masters**, **contact facets**, **relationship graphs** as a governed domain boundary.
- You want to integrate through declared actions, resources, jobs, workflows, and UI surfaces instead of implicit side effects.
- You need the host application to keep plugin boundaries honest through manifest capabilities, permissions, and verification lanes.

### This plugin is intentionally not

- Not a full vertical application suite; this plugin only owns the domain slice exported in this repo.
- Not a replacement for explicit orchestration in jobs/workflows when multi-step automation is required.

## Repo Map

| Path | Purpose |
| --- | --- |
| `package.json` | Root extracted-repo manifest, workspace wiring, and repo-level script entrypoints. |
| `framework/builtin-plugins/party-relationships-core` | Nested publishable plugin package. |
| `framework/builtin-plugins/party-relationships-core/src` | Runtime source, actions, resources, services, and UI exports. |
| `framework/builtin-plugins/party-relationships-core/tests` | Unit, contract, integration, and migration coverage where present. |
| `framework/builtin-plugins/party-relationships-core/docs` | Internal domain-doc source set kept in sync with this guide. |
| `framework/builtin-plugins/party-relationships-core/db/schema.ts` | Database schema contract when durable state is owned. |
| `framework/builtin-plugins/party-relationships-core/src/postgres.ts` | SQL migration and rollback helpers when exported. |

## Manifest Contract

| Field | Value |
| --- | --- |
| Package Name | `@plugins/party-relationships-core` |
| Manifest ID | `party-relationships-core` |
| Display Name | Party & Relationships Core |
| Domain Group | Operational Data |
| Default Category | Business / Party & Relationships |
| Version | `0.1.0` |
| Kind | `plugin` |
| Trust Tier | `first-party` |
| Review Tier | `R1` |
| Isolation Profile | `same-process-trusted` |
| Framework Compatibility | ^0.1.0 |
| Runtime Compatibility | bun>=1.3.12 |
| Database Compatibility | postgres, sqlite |

## Dependency Graph And Capability Requests

| Field | Value |
| --- | --- |
| Depends On | `auth-core`, `org-tenant-core`, `role-policy-core`, `audit-core`, `workflow-core` |
| Recommended Plugins | `crm-core`, `support-service-core`, `business-portals-core` |
| Capability Enhancing | `contracts-core`, `analytics-bi-core`, `ai-assist-core` |
| Integration Only | `e-invoicing-core` |
| Suggested Packs | `localization-global-base` |
| Standalone Supported | Yes |
| Requested Capabilities | `ui.register.admin`, `api.rest.mount`, `data.write.party`, `events.publish.party` |
| Provides Capabilities | `party.parties`, `party.contacts`, `party.relationships` |
| Owns Data | `party.parties`, `party.contacts`, `party.relationships`, `party.role-facets` |

### Dependency interpretation

- Direct plugin dependencies describe package-level coupling that must already be present in the host graph.
- Requested capabilities tell the host what platform services or sibling plugins this package expects to find.
- Provided capabilities and owned data tell integrators what this package is authoritative for.

## Public Integration Surfaces

| Type | ID / Symbol | Access / Mode | Notes |
| --- | --- | --- | --- |
| Action | `party.parties.create` | Permission: `party.parties.write` | Create Party Record<br>Idempotent<br>Audited |
| Action | `party.parties.merge` | Permission: `party.parties.write` | Merge Party Records<br>Non-idempotent<br>Audited |
| Action | `party.roles.activate` | Permission: `party.roles.write` | Activate Party Role<br>Non-idempotent<br>Audited |
| Action | `party.parties.hold` | Permission: `party.parties.write` | Place Record On Hold<br>Non-idempotent<br>Audited |
| Action | `party.parties.release` | Permission: `party.parties.write` | Release Record Hold<br>Non-idempotent<br>Audited |
| Action | `party.parties.amend` | Permission: `party.parties.write` | Amend Record<br>Non-idempotent<br>Audited |
| Action | `party.parties.reverse` | Permission: `party.parties.write` | Reverse Record<br>Non-idempotent<br>Audited |
| Resource | `party.parties` | Portal disabled | Canonical parties with multi-role lifecycle metadata and traceability fields.<br>Purpose: Provide one governed write model for customers, suppliers, prospects, and related external entities.<br>Admin auto-CRUD enabled<br>Fields: `title`, `recordState`, `approvalState`, `postingState`, `fulfillmentState`, `updatedAt` |
| Resource | `party.contacts` | Portal disabled | Contact and address records attached to canonical parties.<br>Purpose: Keep communication endpoints and jurisdiction-sensitive address data aligned to party truth.<br>Admin auto-CRUD enabled<br>Fields: `label`, `status`, `requestedAction`, `updatedAt` |
| Resource | `party.relationships` | Portal disabled | Parent-child and commercial relationships between parties.<br>Purpose: Model hierarchies, account ownership, and cross-party commercial context without duplicating master records.<br>Admin auto-CRUD enabled<br>Fields: `severity`, `status`, `reasonCode`, `updatedAt` |

### Job Catalog

| Job | Queue | Retry | Timeout |
| --- | --- | --- | --- |
| `party.projections.refresh` | `party-projections` | Retry policy not declared | No timeout declared |
| `party.reconciliation.run` | `party-reconciliation` | Retry policy not declared | No timeout declared |


### Workflow Catalog

| Workflow | Actors | States | Purpose |
| --- | --- | --- | --- |
| `party-onboarding` | `operations`, `compliance`, `commercial-owner` | `draft`, `pending_approval`, `active`, `reconciled`, `closed`, `canceled` | Keep party onboarding governed, deduplicated, and auditable before downstream domains depend on it. |


### UI Surface Summary

| Surface | Present | Notes |
| --- | --- | --- |
| UI Surface | Yes | A bounded UI surface export is present. |
| Admin Contributions | Yes | Additional admin workspace contributions are exported. |
| Zone/Canvas Extension | No | No dedicated zone extension export. |

## Hooks, Events, And Orchestration

This plugin should be integrated through **explicit commands/actions, resources, jobs, workflows, and the surrounding Gutu event runtime**. It must **not** be documented as a generic WordPress-style hook system unless such a hook API is explicitly exported.

- No standalone plugin-owned lifecycle event feed is exported today.
- Job surface: `party.projections.refresh`, `party.reconciliation.run`.
- Workflow surface: `party-onboarding`.
- Recommended composition pattern: invoke actions, read resources, then let the surrounding Gutu command/event/job runtime handle downstream automation.

## Storage, Schema, And Migration Notes

- Database compatibility: `postgres`, `sqlite`
- Schema file: `framework/builtin-plugins/party-relationships-core/db/schema.ts`
- SQL helper file: `framework/builtin-plugins/party-relationships-core/src/postgres.ts`
- Migration lane present: Yes

The plugin ships explicit SQL helper exports. Use those helpers as the truth source for database migration or rollback expectations.

## Failure Modes And Recovery

- Action inputs can fail schema validation or permission evaluation before any durable mutation happens.
- If downstream automation is needed, the host must add it explicitly instead of assuming this plugin emits jobs.
- There is no separate lifecycle-event feed to rely on today; do not build one implicitly from internal details.
- Schema regressions are expected to show up in the migration lane and should block shipment.

## Mermaid Flows

### Primary Lifecycle

```mermaid
flowchart LR
  caller["Host or operator"] --> action["party.parties.create"]
  action --> validation["Schema + permission guard"]
  validation --> service["Party & Relationships Core service layer"]
  service --> state["party.parties"]
  service --> jobs["Follow-up jobs / queue definitions"]
  service --> workflows["Workflow state transitions"]
  state --> ui["Admin contributions"]
```

### Workflow State Machine

```mermaid
stateDiagram-v2
  [*] --> draft
  draft --> pending_approval
  draft --> active
  draft --> reconciled
  draft --> closed
  draft --> canceled
```


## Integration Recipes

### 1. Host wiring

```ts
import { manifest, createPartyRecordAction, BusinessPrimaryResource, jobDefinitions, workflowDefinitions, adminContributions, uiSurface } from "@plugins/party-relationships-core";

export const pluginSurface = {
  manifest,
  createPartyRecordAction,
  BusinessPrimaryResource,
  jobDefinitions,
  workflowDefinitions,
  adminContributions,
  uiSurface
};
```

Use this pattern when your host needs to register the plugin’s declared exports without reaching into internal file paths.

### 2. Action-first orchestration

```ts
import { manifest, createPartyRecordAction } from "@plugins/party-relationships-core";

console.log("plugin", manifest.id);
console.log("action", createPartyRecordAction.id);
```

- Prefer action IDs as the stable integration boundary.
- Respect the declared permission, idempotency, and audit metadata instead of bypassing the service layer.
- Treat resource IDs as the read-model boundary for downstream consumers.

### 3. Cross-plugin composition

- Register the workflow definitions with the host runtime instead of re-encoding state transitions outside the plugin.
- Drive follow-up automation from explicit workflow transitions and resource reads.
- Pair workflow decisions with notifications or jobs in the outer orchestration layer when humans must be kept in the loop.

## Test Matrix

| Lane | Present | Evidence |
| --- | --- | --- |
| Build | Yes | `bun run build` |
| Typecheck | Yes | `bun run typecheck` |
| Lint | Yes | `bun run lint` |
| Test | Yes | `bun run test` |
| Unit | Yes | 1 file(s) |
| Contracts | Yes | 1 file(s) |
| Integration | Yes | 1 file(s) |
| Migrations | Yes | 2 file(s) |

### Verification commands

- `bun run build`
- `bun run typecheck`
- `bun run lint`
- `bun run test`
- `bun run test:contracts`
- `bun run test:unit`
- `bun run test:integration`
- `bun run test:migrations`
- `bun run docs:check`

## Current Truth And Recommended Next

### Current truth

- Exports 7 governed actions: `party.parties.create`, `party.parties.merge`, `party.roles.activate`, `party.parties.hold`, `party.parties.release`, `party.parties.amend`, `party.parties.reverse`.
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

### Current gaps

- No extra gaps were discovered beyond the plugin’s declared boundaries.

### Recommended next

- Deepen dedupe, survivorship, and merge safety before more downstream commercial and financial plugins depend on party truth.
- Add stronger hierarchy, KYC, and localization-aware contact governance as onboarding depth increases.
- Broaden lifecycle coverage with deeper orchestration, reconciliation, and operator tooling where the business flow requires it.
- Add more explicit domain events or follow-up job surfaces when downstream systems need tighter coupling.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `Customer`, `Supplier`, `Lead`.

### Later / optional

- Outbound connectors, richer analytics, or portal-facing experiences once the core domain contracts harden.
