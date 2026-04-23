import { defineResource } from "@platform/schema";

import {
  primaryRecordsTable,
  secondaryRecordsTable,
  exceptionRecordsTable
} from "../../db/schema";
import { exceptionRecordSchema, primaryRecordSchema, secondaryRecordSchema } from "../model";

export const BusinessPrimaryResource = defineResource({
  id: "party.parties",
  description: "Canonical parties with multi-role lifecycle metadata and traceability fields.",
  businessPurpose: "Provide one governed write model for customers, suppliers, prospects, and related external entities.",
  table: primaryRecordsTable,
  contract: primaryRecordSchema,
  fields: {
    title: { searchable: true, sortable: true, label: "Title" },
    recordState: { filter: "select", label: "Record State" },
    approvalState: { filter: "select", label: "Approval" },
    postingState: { filter: "select", label: "Posting" },
    fulfillmentState: { filter: "select", label: "Fulfillment" },
    updatedAt: { sortable: true, label: "Updated" }
  },
  admin: {
    autoCrud: true,
    defaultColumns: ["title", "recordState", "approvalState", "postingState", "fulfillmentState", "updatedAt"]
  },
  portal: { enabled: false }
});

export const BusinessSecondaryResource = defineResource({
  id: "party.contacts",
  description: "Contact and address records attached to canonical parties.",
  businessPurpose: "Keep communication endpoints and jurisdiction-sensitive address data aligned to party truth.",
  table: secondaryRecordsTable,
  contract: secondaryRecordSchema,
  fields: {
    label: { searchable: true, sortable: true, label: "Label" },
    status: { filter: "select", label: "Status" },
    requestedAction: { searchable: true, sortable: true, label: "Requested Action" },
    updatedAt: { sortable: true, label: "Updated" }
  },
  admin: {
    autoCrud: true,
    defaultColumns: ["label", "status", "requestedAction", "updatedAt"]
  },
  portal: { enabled: false }
});

export const BusinessExceptionResource = defineResource({
  id: "party.relationships",
  description: "Parent-child and commercial relationships between parties.",
  businessPurpose: "Model hierarchies, account ownership, and cross-party commercial context without duplicating master records.",
  table: exceptionRecordsTable,
  contract: exceptionRecordSchema,
  fields: {
    severity: { filter: "select", label: "Severity" },
    status: { filter: "select", label: "Status" },
    reasonCode: { searchable: true, sortable: true, label: "Reason" },
    updatedAt: { sortable: true, label: "Updated" }
  },
  admin: {
    autoCrud: true,
    defaultColumns: ["severity", "status", "reasonCode", "updatedAt"]
  },
  portal: { enabled: false }
});

export const businessResources = [
  BusinessPrimaryResource,
  BusinessSecondaryResource,
  BusinessExceptionResource
] as const;
