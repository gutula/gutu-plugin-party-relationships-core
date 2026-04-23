export const scenarioDefinitions = [
  {
    "id": "party-onboarding",
    "owningPlugin": "party-relationships-core",
    "workflowId": "party-onboarding",
    "actionIds": [
      "party.parties.create",
      "party.parties.merge",
      "party.roles.activate",
      "party.parties.hold",
      "party.parties.release",
      "party.parties.amend",
      "party.parties.reverse"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "traceability.reconciliation.queue"
      ]
    }
  },
  {
    "id": "party-deduplication-merge",
    "owningPlugin": "party-relationships-core",
    "workflowId": "party-onboarding",
    "actionIds": [
      "party.parties.create",
      "party.parties.merge",
      "party.roles.activate",
      "party.parties.hold",
      "party.parties.release",
      "party.parties.amend",
      "party.parties.reverse"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "traceability.reconciliation.queue"
      ]
    }
  },
  {
    "id": "customer-supplier-cross-role-activation",
    "owningPlugin": "party-relationships-core",
    "workflowId": "party-onboarding",
    "actionIds": [
      "party.parties.create",
      "party.parties.merge",
      "party.roles.activate",
      "party.parties.hold",
      "party.parties.release",
      "party.parties.amend",
      "party.parties.reverse"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "traceability.reconciliation.queue"
      ]
    }
  }
] as const;
