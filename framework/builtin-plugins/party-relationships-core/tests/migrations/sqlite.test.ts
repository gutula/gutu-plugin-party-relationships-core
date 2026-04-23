import { describe, expect, it } from "bun:test";

import {
  buildPartyRelationshipsCoreSqliteMigrationSql,
  buildPartyRelationshipsCoreSqliteRollbackSql,
  getPartyRelationshipsCoreSqliteLookupIndexName,
  getPartyRelationshipsCoreSqliteStatusIndexName
} from "../../src/sqlite";

describe("party-relationships-core sqlite helpers", () => {
  it("creates the business tables and indexes", () => {
    const sql = buildPartyRelationshipsCoreSqliteMigrationSql().join("\n");

    expect(sql).toContain("CREATE TABLE IF NOT EXISTS party_relationships_core_primary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS party_relationships_core_secondary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS party_relationships_core_exception_records");
    expect(sql).toContain(getPartyRelationshipsCoreSqliteLookupIndexName("party_relationships_core_"));
    expect(sql).toContain(getPartyRelationshipsCoreSqliteStatusIndexName("party_relationships_core_"));
  });

  it("rolls the sqlite tables back safely", () => {
    const sql = buildPartyRelationshipsCoreSqliteRollbackSql({ tablePrefix: "party_relationships_core_preview_" }).join("\n");
    expect(sql).toContain("DROP TABLE IF EXISTS party_relationships_core_preview_exception_records");
  });
});
