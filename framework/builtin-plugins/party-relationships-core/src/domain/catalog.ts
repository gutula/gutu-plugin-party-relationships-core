export const domainCatalog = {
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
} as const;
