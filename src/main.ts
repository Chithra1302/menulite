import {
  FoodCategory,
} from "./menu/interfaces/menu-item.interface";

import { MenuRepository } from "./menu/menu.repository";

import { MenuService } from "./menu/menu.service";

const menuRepository = new MenuRepository();

const menuService = new MenuService(
  menuRepository
);

async function bootstrap() {

  const coffee =
    await menuService.createMenuItem({

      id: "1",

      name: "Cold Coffee",

      category: FoodCategory.BEVERAGE,

      price: 120,

      available: true,
    });

  console.log("Created Item:");
  console.log(coffee);

  const menuItems =
    await menuService.getAllMenuItems();

  console.log("\nAll Menu Items:");
  console.log(menuItems);

  const item =
    await menuService.getMenuItemById("1");

  console.log("\nFind By ID:");
  console.log(item);

  const deleted =
    await menuService.deleteMenuItem("1");

  console.log("\nDelete Status:");
  console.log(deleted);

  const remainingItems =
    await menuService.getAllMenuItems();

  console.log("\nRemaining Items:");
  console.log(remainingItems);
}

bootstrap();