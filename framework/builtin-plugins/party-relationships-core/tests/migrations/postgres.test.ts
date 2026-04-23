import { describe, expect, it } from "bun:test";

import {
  buildPartyRelationshipsCoreMigrationSql,
  buildPartyRelationshipsCoreRollbackSql,
  getPartyRelationshipsCoreLookupIndexName,
  getPartyRelationshipsCoreStatusIndexName
} from "../../src/postgres";

describe("party-relationships-core postgres helpers", () => {
  it("creates the business tables and indexes", () => {
    const sql = buildPartyRelationshipsCoreMigrationSql().join("\n");

    expect(sql).toContain("CREATE TABLE IF NOT EXISTS party_relationships_core.primary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS party_relationships_core.secondary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS party_relationships_core.exception_records");
    expect(sql).toContain(getPartyRelationshipsCoreLookupIndexName());
    expect(sql).toContain(getPartyRelationshipsCoreStatusIndexName());
  });

  it("rolls the schema back safely", () => {
    const sql = buildPartyRelationshipsCoreRollbackSql({ schemaName: "party_relationships_core_preview", dropSchema: true }).join("\n");
    expect(sql).toContain("DROP TABLE IF EXISTS party_relationships_core_preview.exception_records");
    expect(sql).toContain("DROP SCHEMA IF EXISTS party_relationships_core_preview CASCADE");
  });
});
