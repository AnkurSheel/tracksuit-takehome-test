import { expect } from "jsr:@std/expect";
import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { withDB } from "../testing.ts";
import createInsight from "./create-insight.ts";

describe("creating an insight in the database", () => {
  withDB((fixture) => {
    beforeAll(() => {
      createInsight({ ...fixture, brand: 2, text: "Test insight" });
    });

    it("persists the insight in the database", () => {
      const rows = fixture.insights.selectAll();
      expect(rows.length).toEqual(1);
      expect(rows[0].brand).toEqual(2);
      expect(rows[0].text).toEqual("Test insight");
    });
  });

  withDB((fixture) => {
    it("throws on negative brand", () => {
      expect(() => createInsight({ ...fixture, brand: -1, text: "Test" }))
        .toThrow();
    });

    it("throws on empty text", () => {
      expect(() => createInsight({ ...fixture, brand: 1, text: "" }))
        .toThrow();
    });
  });
});
