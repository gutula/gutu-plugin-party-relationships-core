import {
  advancePrimaryRecord,
  amendPrimaryRecord,
  createPrimaryRecord,
  placePrimaryRecordOnHold,
  reconcilePrimaryRecord,
  releasePrimaryRecordHold,
  reversePrimaryRecord,
  type AdvancePrimaryRecordInput,
  type AmendPrimaryRecordInput,
  type CreatePrimaryRecordInput,
  type PlacePrimaryRecordOnHoldInput,
  type ReconcilePrimaryRecordInput,
  type ReleasePrimaryRecordHoldInput,
  type ReversePrimaryRecordInput
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
  },
  {
    "id": "party.parties.hold",
    "label": "Place Record On Hold",
    "phase": "hold",
    "methodName": "placeRecordOnHold"
  },
  {
    "id": "party.parties.release",
    "label": "Release Record Hold",
    "phase": "release",
    "methodName": "releaseRecordHold"
  },
  {
    "id": "party.parties.amend",
    "label": "Amend Record",
    "phase": "amend",
    "methodName": "amendRecord"
  },
  {
    "id": "party.parties.reverse",
    "label": "Reverse Record",
    "phase": "reverse",
    "methodName": "reverseRecord"
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

export async function placeRecordOnHold(input: PlacePrimaryRecordOnHoldInput) {
  return placePrimaryRecordOnHold(input);
}

export async function releaseRecordHold(input: ReleasePrimaryRecordHoldInput) {
  return releasePrimaryRecordHold(input);
}

export async function amendRecord(input: AmendPrimaryRecordInput) {
  return amendPrimaryRecord(input);
}

export async function reverseRecord(input: ReversePrimaryRecordInput) {
  return reversePrimaryRecord(input);
}
