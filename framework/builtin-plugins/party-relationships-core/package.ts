import { definePackage } from "@platform/kernel";

export default definePackage({
  "id": "party-relationships-core",
  "kind": "plugin",
  "version": "0.1.0",
  "contractVersion": "1.0.0",
  "sourceRepo": "gutu-plugin-party-relationships-core",
  "displayName": "Party & Relationships Core",
  "domainGroup": "Operational Data",
  "defaultCategory": {
    "id": "business",
    "label": "Business",
    "subcategoryId": "party_relationships",
    "subcategoryLabel": "Party & Relationships"
  },
  "description": "Canonical party, contact, address, relationship, and role-facet records for customer, supplier, prospect, and multi-role business identity flows.",
  "extends": [],
  "dependsOn": [
    "auth-core",
    "org-tenant-core",
    "role-policy-core",
    "audit-core",
    "workflow-core"
  ],
  "dependencyContracts": [
    {
      "packageId": "auth-core",
      "class": "required",
      "rationale": "Required for Party & Relationships Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "org-tenant-core",
      "class": "required",
      "rationale": "Required for Party & Relationships Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "role-policy-core",
      "class": "required",
      "rationale": "Required for Party & Relationships Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "audit-core",
      "class": "required",
      "rationale": "Required for Party & Relationships Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "workflow-core",
      "class": "required",
      "rationale": "Required for Party & Relationships Core to keep its boundary governed and explicit."
    }
  ],
  "optionalWith": [],
  "conflictsWith": [],
  "providesCapabilities": [
    "party.parties",
    "party.contacts",
    "party.relationships"
  ],
  "requestedCapabilities": [
    "ui.register.admin",
    "api.rest.mount",
    "data.write.party",
    "events.publish.party"
  ],
  "ownsData": [
    "party.parties",
    "party.contacts",
    "party.relationships",
    "party.role-facets"
  ],
  "extendsData": [],
  "publicCommands": [
    "party.parties.create",
    "party.parties.merge",
    "party.roles.activate"
  ],
  "publicQueries": [
    "party.party-summary",
    "party.relationship-graph"
  ],
  "publicEvents": [
    "party.created.v1",
    "party.merged.v1",
    "party.role-activated.v1"
  ],
  "domainCatalog": {
    "erpnextModules": [
      "CRM",
      "Selling",
      "Buying"
    ],
    "erpnextDoctypes": [
      "Customer",
      "Supplier",
      "Lead",
      "Prospect",
      "Contact",
      "Address",
      "Customer Group Item"
    ],
    "ownedEntities": [
      "Party",
      "Party Role Facet",
      "Contact",
      "Address",
      "Relationship Hierarchy",
      "Bank Account Reference"
    ],
    "reports": [
      "Lead Details",
      "Opportunity Summary",
      "Prospect Pipeline",
      "Customer Contact Audit"
    ],
    "exceptionQueues": [
      "party-dedupe-review",
      "contact-validation-failures",
      "role-activation-holds"
    ],
    "operationalScenarios": [
      "party-onboarding",
      "party-deduplication-merge",
      "customer-supplier-cross-role-activation"
    ],
    "settingsSurfaces": [
      "CRM Settings",
      "Selling Settings",
      "Buying Settings"
    ],
    "edgeCases": [
      "duplicate identities across customer and supplier roles",
      "invalid address hierarchy",
      "party merge with downstream references"
    ]
  },
  "slotClaims": [],
  "trustTier": "first-party",
  "reviewTier": "R1",
  "isolationProfile": "same-process-trusted",
  "compatibility": {
    "framework": "^0.1.0",
    "runtime": "bun>=1.3.12",
    "db": [
      "postgres",
      "sqlite"
    ]
  }
});
