export const exceptionQueueDefinitions = [
  {
    "id": "party-dedupe-review",
    "label": "Party Dedupe Review",
    "severity": "medium",
    "owner": "operations",
    "reconciliationJobId": "party.reconciliation.run"
  },
  {
    "id": "contact-validation-failures",
    "label": "Contact Validation Failures",
    "severity": "medium",
    "owner": "operations",
    "reconciliationJobId": "party.reconciliation.run"
  },
  {
    "id": "role-activation-holds",
    "label": "Role Activation Holds",
    "severity": "medium",
    "owner": "operations",
    "reconciliationJobId": "party.reconciliation.run"
  }
] as const;
