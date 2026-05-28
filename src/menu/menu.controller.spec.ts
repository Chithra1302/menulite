import "reflect-metadata";

import { MenuController } from "./menu.controller";
import { MenuService } from "./menu.service";
import { FoodCategory, MenuItem } from "./interfaces/menu-item.interface";

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

// ─── Mock Service ─────────────────────────────────────────────────────────────

const mockService = (): jest.Mocked<MenuService> =>
  ({
    createMenuItem: jest.fn(),
    getAllMenuItems: jest.fn(),
    getMenuItemById: jest.fn(),
    updateMenuItem: jest.fn(),
    deleteMenuItem: jest.fn(),
  }) as unknown as jest.Mocked<MenuService>;

// ─── Suite ────────────────────────────────────────────────────────────────────

describe("MenuController", () => {
  let controller: MenuController;
  let service: jest.Mocked<MenuService>;

  beforeEach(() => {
    service = mockService();
    controller = new MenuController(service);
  });

  // ─── create() ───────────────────────────────────────────────────────────────

  describe("create()", () => {
    it("delegates to service.createMenuItem and returns the created item", async () => {
      const dto = {
        id: "item-1",
        name: "Espresso",
        category: FoodCategory.BEVERAGE,
        price: 2.5,
        available: true,
      };
      const createdItem = makeItem(dto);
      service.createMenuItem.mockResolvedValue(createdItem);

      const result = await controller.create(dto);

      expect(service.createMenuItem).toHaveBeenCalledWith(dto);
      expect(result).toEqual(createdItem);
    });
  });

  // ─── findAll() ──────────────────────────────────────────────────────────────

  describe("findAll()", () => {
    it("delegates to service.getAllMenuItems and returns array of items", async () => {
      const items = [
        makeItem({ id: "item-1", name: "Espresso" }),
        makeItem({ id: "item-2", name: "Latte" }),
      ];
      service.getAllMenuItems.mockResolvedValue(items);

      const result = await controller.findAll();

      expect(service.getAllMenuItems).toHaveBeenCalled();
      expect(result).toEqual(items);
    });

    it("returns an empty array when no items exist", async () => {
      service.getAllMenuItems.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
    });
  });

  // ─── findOne() ──────────────────────────────────────────────────────────────

  describe("findOne()", () => {
    it("delegates to service.getMenuItemById and returns the matching item", async () => {
      const item = makeItem({ id: "item-1" });
      service.getMenuItemById.mockResolvedValue(item);

      const result = await controller.findOne("item-1");

      expect(service.getMenuItemById).toHaveBeenCalledWith("item-1");
      expect(result).toEqual(item);
    });
  });

  // ─── update() ───────────────────────────────────────────────────────────────

  describe("update()", () => {
    it("delegates to service.updateMenuItem and returns the updated item", async () => {
      const dto = { name: "Cappuccino", price: 3.0 };
      const updatedItem = makeItem({ id: "item-1", ...dto });
      service.updateMenuItem.mockResolvedValue(updatedItem);

      const result = await controller.update("item-1", dto);

      expect(service.updateMenuItem).toHaveBeenCalledWith("item-1", dto);
      expect(result).toEqual(updatedItem);
    });
  });

  // ─── remove() ───────────────────────────────────────────────────────────────

  describe("remove()", () => {
    it("delegates to service.deleteMenuItem and returns deleted status", async () => {
      service.deleteMenuItem.mockResolvedValue(true);

      const result = await controller.remove("item-1");

      expect(service.deleteMenuItem).toHaveBeenCalledWith("item-1");
      expect(result).toEqual({ deleted: true });
    });

    it("returns deleted false if service deletion fails", async () => {
      service.deleteMenuItem.mockResolvedValue(false);

      const result = await controller.remove("ghost");

      expect(service.deleteMenuItem).toHaveBeenCalledWith("ghost");
      expect(result).toEqual({ deleted: false });
    });
  });
});
