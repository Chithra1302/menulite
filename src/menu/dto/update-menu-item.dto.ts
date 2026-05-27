import { z } from "zod";

import { FoodCategory } from "../interfaces/menu-item.interface";

export const UpdateMenuItemSchema = z.object({
  name: z.string().min(1, "Name cannot be empty").optional(),

  category: z
    .nativeEnum(FoodCategory, {
      message: "Invalid food category",
    })
    .optional(),

  price: z
    .number()
    .positive("Price must be a positive number")
    .optional(),

  available: z.boolean().optional(),
});

export class UpdateMenuItemDto {
  declare name?: string;

  declare category?: FoodCategory;

  declare price?: number;

  declare available?: boolean;
}
