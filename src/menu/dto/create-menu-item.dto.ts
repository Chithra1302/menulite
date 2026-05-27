import { FoodCategory } from "../interfaces/menu-item.interface";

export class CreateMenuItemDto {
  id: string;

  name: string;

  category: FoodCategory;

  price: number;

  available: boolean;
}
