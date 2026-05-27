import { FoodCategory } from "./menu/interfaces/menu-item.interface";

import { MenuRepository } from "./menu/menu.repository";

import { MenuService } from "./menu/menu.service";

import { CreateMenuItemDto } from "./menu/dto/create-menu-item.dto";

import { UpdateMenuItemDto } from "./menu/dto/update-menu-item.dto";

const menuRepository = new MenuRepository();

const menuService = new MenuService(menuRepository);

async function bootstrap() {

  // --- CREATE ---
  const createDto: CreateMenuItemDto = {
    id: "1",
    name: "Cold Coffee",
    category: FoodCategory.BEVERAGE,
    price: 120,
    available: true,
  };

  const coffee = await menuService.createMenuItem(createDto);

  console.log("Created Item:");
  console.log(coffee);

  // --- GET ALL ---
  const menuItems = await menuService.getAllMenuItems();

  console.log("\nAll Menu Items:");
  console.log(menuItems);

  // --- GET BY ID ---
  const item = await menuService.getMenuItemById("1");

  console.log("\nFind By ID:");
  console.log(item);

  // --- UPDATE ---
  const updateDto: UpdateMenuItemDto = {
    price: 150,
    name: "Iced Cold Coffee",
  };

  const updated = await menuService.updateMenuItem("1", updateDto);

  console.log("\nUpdated Item:");
  console.log(updated);

  // --- DELETE ---
  const deleted = await menuService.deleteMenuItem("1");

  console.log("\nDelete Status:");
  console.log(deleted);

  // --- REMAINING ---
  const remainingItems = await menuService.getAllMenuItems();

  console.log("\nRemaining Items:");
  console.log(remainingItems);
}

bootstrap();