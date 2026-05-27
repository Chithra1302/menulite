import { FoodCategory } from "../interfaces/menu-item.interface";

export class UpdateMenuItemDto {
  name?: string;

  category?: FoodCategory;

  price?: number;

  available?: boolean;
}
