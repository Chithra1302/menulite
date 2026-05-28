import "reflect-metadata";

import { MenuService } from "./menu.service";
import { MenuRepository } from "./menu.repository";
import { FoodCategory, MenuItem } from "./interfaces/menu-item.interface";
import { ValidationError } from "../common/errors/validation.error";
import { NotFoundError } from "../common/errors/not-found.error";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const makeItem = (overrides: Partial<MenuItem> = {}): MenuItem => ({
  id: "item-1",
  name: "Espresso",
  category: FoodCategory.BEVERAGE,
  price: 2.5,
  available: true,
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
  ...overrides,
});

const validCreateDto = {
  id: "item-1",
  name: "Espresso",
  category: FoodCategory.BEVERAGE,
  price: 2.5,
  available: true,
};

// ─── Mock Repository ──────────────────────────────────────────────────────────

const mockRepository = (): jest.Mocked<MenuRepository> =>
  ({
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }) as unknown as jest.Mocked<MenuRepository>;

// ─── Suite ────────────────────────────────────────────────────────────────────

describe("MenuService", () => {
  let service: MenuService;
  let repo: jest.Mocked<MenuRepository>;

  beforeEach(() => {
    repo = mockRepository();
    service = new MenuService(repo);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // helper: flush the 500ms simulated DB delay
  const flush = () => jest.runAllTimersAsync();

  // ─── createMenuItem ─────────────────────────────────────────────────────────

  describe("createMenuItem()", () => {
    it("creates and returns a menu item for valid input", async () => {
      const stored = makeItem();
      repo.create.mockReturnValue(stored);

      const promise = service.createMenuItem(validCreateDto);
      await flush();
      const result = await promise;

      expect(repo.create).toHaveBeenCalledTimes(1);
      expect(result).toMatchObject({
        id: "item-1",
        name: "Espresso",
        category: FoodCategory.BEVERAGE,
        price: 2.5,
        available: true,
      });
    });

    it("throws ValidationError when name is missing", async () => {
      const promise = service.createMenuItem({ ...validCreateDto, name: "" });
      // Attach rejection handler BEFORE flush to prevent unhandled rejection warning
      const assertion = expect(promise).rejects.toBeInstanceOf(ValidationError);
      await flush();
      await assertion;
    });

    it("throws ValidationError when price is negative", async () => {
      const promise = service.createMenuItem({ ...validCreateDto, price: -1 });
      const assertion = expect(promise).rejects.toBeInstanceOf(ValidationError);
      await flush();
      await assertion;
    });

    it("throws ValidationError when category is invalid", async () => {
      const promise = service.createMenuItem({
        ...validCreateDto,
        category: "INVALID" as FoodCategory,
      });
      const assertion = expect(promise).rejects.toBeInstanceOf(ValidationError);
      await flush();
      await assertion;
    });
  });

  // ─── getAllMenuItems ─────────────────────────────────────────────────────────

  describe("getAllMenuItems()", () => {
    it("returns all items from the repository", async () => {
      const items = [makeItem(), makeItem({ id: "item-2", name: "Latte" })];
      repo.findAll.mockReturnValue(items);

      const promise = service.getAllMenuItems();
      await flush();
      const result = await promise;

      expect(result).toEqual(items);
      expect(repo.findAll).toHaveBeenCalledTimes(1);
    });

    it("returns an empty array when no items exist", async () => {
      repo.findAll.mockReturnValue([]);

      const promise = service.getAllMenuItems();
      await flush();
      const result = await promise;

      expect(result).toEqual([]);
    });
  });

  // ─── getMenuItemById ────────────────────────────────────────────────────────

  describe("getMenuItemById()", () => {
    it("returns the item when found", async () => {
      const item = makeItem();
      repo.findById.mockReturnValue(item);

      const promise = service.getMenuItemById("item-1");
      await flush();
      const result = await promise;

      expect(result).toEqual(item);
    });

    it("throws NotFoundError when item does not exist", async () => {
      repo.findById.mockReturnValue(undefined);

      const promise = service.getMenuItemById("ghost");
      const assertion = expect(promise).rejects.toBeInstanceOf(NotFoundError);
      await flush();
      await assertion;
    });
  });

  // ─── updateMenuItem ─────────────────────────────────────────────────────────

  describe("updateMenuItem()", () => {
    it("updates and returns the item for valid input", async () => {
      const updated = makeItem({ name: "Cappuccino", price: 3.0 });
      repo.update.mockReturnValue(updated);

      const promise = service.updateMenuItem("item-1", {
        name: "Cappuccino",
        price: 3.0,
      });
      await flush();
      const result = await promise;

      expect(result).toEqual(updated);
    });

    it("throws ValidationError when update data is invalid", async () => {
      const promise = service.updateMenuItem("item-1", { price: -99 });
      const assertion = expect(promise).rejects.toBeInstanceOf(ValidationError);
      await flush();
      await assertion;
    });

    it("throws NotFoundError when item does not exist", async () => {
      repo.update.mockReturnValue(undefined);

      const promise = service.updateMenuItem("ghost", { name: "Phantom" });
      const assertion = expect(promise).rejects.toBeInstanceOf(NotFoundError);
      await flush();
      await assertion;
    });
  });

  // ─── deleteMenuItem ─────────────────────────────────────────────────────────

  describe("deleteMenuItem()", () => {
    it("returns true when item is deleted successfully", async () => {
      repo.delete.mockReturnValue(true);

      const promise = service.deleteMenuItem("item-1");
      await flush();
      const result = await promise;

      expect(result).toBe(true);
    });

    it("throws NotFoundError when item does not exist", async () => {
      repo.delete.mockReturnValue(false);

      const promise = service.deleteMenuItem("ghost");
      const assertion = expect(promise).rejects.toBeInstanceOf(NotFoundError);
      await flush();
      await assertion;
    });
  });
});
