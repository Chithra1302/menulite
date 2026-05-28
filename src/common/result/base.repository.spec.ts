import { BaseRepository } from "./base.repository";

// Minimal entity that satisfies the T extends { id: string } constraint
interface TestItem {
  id: string;
  name: string;
}

class TestRepository extends BaseRepository<TestItem> {}

describe("BaseRepository", () => {
  let repo: TestRepository;

  const itemA: TestItem = { id: "1", name: "Espresso" };
  const itemB: TestItem = { id: "2", name: "Latte" };

  beforeEach(() => {
    repo = new TestRepository();
  });

  // ─── findAll ───────────────────────────────────────────────────────────────

  describe("findAll()", () => {
    it("returns an empty array when no items exist", () => {
      expect(repo.findAll()).toEqual([]);
    });

    it("returns all created items", () => {
      repo.create(itemA);
      repo.create(itemB);
      expect(repo.findAll()).toEqual([itemA, itemB]);
    });
  });

  // ─── findById ──────────────────────────────────────────────────────────────

  describe("findById()", () => {
    it("returns the item when found", () => {
      repo.create(itemA);
      expect(repo.findById("1")).toEqual(itemA);
    });

    it("returns undefined when item does not exist", () => {
      expect(repo.findById("999")).toBeUndefined();
    });
  });

  // ─── create ────────────────────────────────────────────────────────────────

  describe("create()", () => {
    it("adds the item and returns it", () => {
      const result = repo.create(itemA);
      expect(result).toEqual(itemA);
      expect(repo.findAll()).toHaveLength(1);
    });
  });

  // ─── update ────────────────────────────────────────────────────────────────

  describe("update()", () => {
    it("updates the item and returns the updated version", () => {
      repo.create(itemA);
      const updated = repo.update("1", { name: "Cappuccino" });
      expect(updated).toEqual({ id: "1", name: "Cappuccino" });
    });

    it("returns undefined when item does not exist", () => {
      const result = repo.update("999", { name: "Ghost" });
      expect(result).toBeUndefined();
    });
  });

  // ─── delete ────────────────────────────────────────────────────────────────

  describe("delete()", () => {
    it("removes the item and returns true", () => {
      repo.create(itemA);
      expect(repo.delete("1")).toBe(true);
      expect(repo.findAll()).toHaveLength(0);
    });

    it("returns false when item does not exist", () => {
      expect(repo.delete("999")).toBe(false);
    });
  });
});
