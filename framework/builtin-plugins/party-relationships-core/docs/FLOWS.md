# Party & Relationships Core Flows

## Happy paths

- `party.parties.create`: Create Party Record
- `party.parties.merge`: Merge Party Records
- `party.roles.activate`: Activate Party Role

## Operational scenario matrix

- `party-onboarding`
- `party-deduplication-merge`
- `customer-supplier-cross-role-activation`

## Action-level flows

### `party.parties.create`

Create Party Record

Permission: `party.parties.write`

Business purpose: Expose the plugin’s write boundary through a validated, auditable action contract.

Preconditions:

- Caller input must satisfy the action schema exported by the plugin.
- The caller must satisfy the declared permission and any host-level installation constraints.
- Integration should honor the action’s idempotent semantics.

Side effects:

- Mutates or validates state owned by `party.parties`, `party.contacts`, `party.relationships`.
- May schedule or describe follow-up background work.

Forbidden shortcuts:

- Do not bypass the action contract with undocumented service mutations in application code.
- Do not document extra hooks, retries, or lifecycle semantics unless they are explicitly exported here.


### `party.parties.merge`

Merge Party Records

Permission: `party.parties.write`

Business purpose: Expose the plugin’s write boundary through a validated, auditable action contract.

Preconditions:

- Caller input must satisfy the action schema exported by the plugin.
- The caller must satisfy the declared permission and any host-level installation constraints.
- Integration should honor the action’s non-idempotent semantics.

Side effects:

- Mutates or validates state owned by `party.parties`, `party.contacts`, `party.relationships`.
- May schedule or describe follow-up background work.

Forbidden shortcuts:

- Do not bypass the action contract with undocumented service mutations in application code.
- Do not document extra hooks, retries, or lifecycle semantics unless they are explicitly exported here.


### `party.roles.activate`

Activate Party Role

Permission: `party.roles.write`

Business purpose: Expose the plugin’s write boundary through a validated, auditable action contract.

Preconditions:

- Caller input must satisfy the action schema exported by the plugin.
- The caller must satisfy the declared permission and any host-level installation constraints.
- Integration should honor the action’s non-idempotent semantics.

Side effects:

- Mutates or validates state owned by `party.parties`, `party.contacts`, `party.relationships`.
- May schedule or describe follow-up background work.

Forbidden shortcuts:

- Do not bypass the action contract with undocumented service mutations in application code.
- Do not document extra hooks, retries, or lifecycle semantics unless they are explicitly exported here.


## Cross-package interactions

- Direct dependencies: `auth-core`, `org-tenant-core`, `role-policy-core`, `audit-core`, `workflow-core`
- Requested capabilities: `ui.register.admin`, `api.rest.mount`, `data.write.party`, `events.publish.party`
- Integration model: Actions+Resources+Jobs+Workflows+UI
- ERPNext doctypes used as parity references: `Customer`, `Supplier`, `Lead`, `Prospect`, `Contact`, `Address`, `Customer Group Item`
- Recovery ownership should stay with the host orchestration layer when the plugin does not explicitly export jobs, workflows, or lifecycle events.
