import {
  FoodCategory,
  MenuItem,
} from "./menu/interfaces/menu-item.interface";

import { MenuRepository } from "./menu/menu.repository";

const menuRepository = new MenuRepository();

const coffee: MenuItem = {
  id: "1",

  name: "Cold Coffee",

  category: FoodCategory.BEVERAGE,

  price: 120,

  available: true,

  createdAt: new Date(),

  updatedAt: new Date(),
};

menuRepository.create(coffee);

console.log(menuRepository.findAll());