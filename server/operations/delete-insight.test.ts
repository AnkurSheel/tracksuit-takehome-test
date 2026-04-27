import { expect } from "jsr:@std/expect";
import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { withDB } from "../testing.ts";
import deleteInsight from "./delete-insight.ts";

describe("deleting an insight from the database", () => {
  withDB((fixture) => {
    beforeAll(() => {
      fixture.insights.insert([
        {
          brand: 1,
          createdAt: new Date().toISOString(),
          text: "Insight to delete",
        },
      ]);
      const [row] = fixture.insights.selectAll();
      deleteInsight({ ...fixture, id: row.id });
    });

    it("removes the insight from the database", () => {
      const rows = fixture.insights.selectAll();
      expect(rows.length).toEqual(0);
    });
  });

  withDB((fixture) => {
    it("throws on negative id", () => {
      expect(() => deleteInsight({ ...fixture, id: -1 })).toThrow();
    });
  });
});
