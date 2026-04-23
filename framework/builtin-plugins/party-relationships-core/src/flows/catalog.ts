import {
  advancePrimaryRecord,
  createPrimaryRecord,
  reconcilePrimaryRecord,
  type AdvancePrimaryRecordInput,
  type CreatePrimaryRecordInput,
  type ReconcilePrimaryRecordInput
} from "../services/main.service";

export const businessFlowDefinitions = [
  {
    "id": "party.parties.create",
    "label": "Create Party Record",
    "phase": "create",
    "methodName": "createPartyRecord"
  },
  {
    "id": "party.parties.merge",
    "label": "Merge Party Records",
    "phase": "advance",
    "methodName": "mergePartyRecords"
  },
  {
    "id": "party.roles.activate",
    "label": "Activate Party Role",
    "phase": "reconcile",
    "methodName": "activatePartyRole"
  }
] as const;

export async function createPartyRecord(input: CreatePrimaryRecordInput) {
  return createPrimaryRecord(input);
}

export async function mergePartyRecords(input: AdvancePrimaryRecordInput) {
  return advancePrimaryRecord(input);
}

export async function activatePartyRole(input: ReconcilePrimaryRecordInput) {
  return reconcilePrimaryRecord(input);
}
