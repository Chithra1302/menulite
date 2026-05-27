import { FoodCategory } from "./menu/interfaces/menu-item.interface";

import { MenuRepository } from "./menu/menu.repository";

import { MenuService } from "./menu/menu.service";

import { AppError } from "./common/errors/app.error";

const menuRepository = new MenuRepository();

const menuService = new MenuService(menuRepository);

async function bootstrap() {

  // --- VALID CREATE ---
  console.log("=== Create Valid Item ===");
  const coffee = await menuService.createMenuItem({
    id: "1",
    name: "Cold Coffee",
    category: FoodCategory.BEVERAGE,
    price: 120,
    available: true,
  });
  console.log(coffee);

  // --- INVALID CREATE (Validation Error) ---
  console.log("\n=== Create Invalid Item (negative price) ===");
  try {
    await menuService.createMenuItem({
      id: "2",
      name: "",
      category: FoodCategory.SNACK,
      price: -50,
      available: true,
    });
  } catch (error) {
    if (error instanceof AppError) {
      console.log(`[${error.statusCode}] ${error.name}: ${error.message}`);
    }
  }

  // --- VALID UPDATE ---
  console.log("\n=== Update Item ===");
  const updated = await menuService.updateMenuItem("1", {
    price: 150,
    name: "Iced Cold Coffee",
  });
  console.log(updated);

  // --- NOT FOUND (Update) ---
  console.log("\n=== Update Non-Existent Item ===");
  try {
    await menuService.updateMenuItem("999", { price: 200 });
  } catch (error) {
    if (error instanceof AppError) {
      console.log(`[${error.statusCode}] ${error.name}: ${error.message}`);
    }
  }

  // --- GET BY ID ---
  console.log("\n=== Get By ID ===");
  const found = await menuService.getMenuItemById("1");
  console.log(found);

  // --- NOT FOUND (Get) ---
  console.log("\n=== Get Non-Existent Item ===");
  try {
    await menuService.getMenuItemById("999");
  } catch (error) {
    if (error instanceof AppError) {
      console.log(`[${error.statusCode}] ${error.name}: ${error.message}`);
    }
  }

  // --- DELETE ---
  console.log("\n=== Delete Item ===");
  const deleted = await menuService.deleteMenuItem("1");
  console.log("Deleted:", deleted);

  // --- NOT FOUND (Delete) ---
  console.log("\n=== Delete Non-Existent Item ===");
  try {
    await menuService.deleteMenuItem("1");
  } catch (error) {
    if (error instanceof AppError) {
      console.log(`[${error.statusCode}] ${error.name}: ${error.message}`);
    }
  }

  // --- REMAINING ---
  console.log("\n=== Remaining Items ===");
  const remaining = await menuService.getAllMenuItems();
  console.log(remaining);
}

bootstrap();