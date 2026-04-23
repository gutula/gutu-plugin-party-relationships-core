export const reportDefinitions = [
  {
    "id": "party-relationships-core.report.01",
    "label": "Lead Details",
    "owningPlugin": "party-relationships-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "party-dedupe-review",
      "contact-validation-failures",
      "role-activation-holds"
    ]
  },
  {
    "id": "party-relationships-core.report.02",
    "label": "Opportunity Summary",
    "owningPlugin": "party-relationships-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "party-dedupe-review",
      "contact-validation-failures",
      "role-activation-holds"
    ]
  },
  {
    "id": "party-relationships-core.report.03",
    "label": "Prospect Pipeline",
    "owningPlugin": "party-relationships-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "party-dedupe-review",
      "contact-validation-failures",
      "role-activation-holds"
    ]
  },
  {
    "id": "party-relationships-core.report.04",
    "label": "Customer Contact Audit",
    "owningPlugin": "party-relationships-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "party-dedupe-review",
      "contact-validation-failures",
      "role-activation-holds"
    ]
  }
] as const;
