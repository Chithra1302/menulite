import { z } from "zod";

import { FoodCategory } from "../interfaces/menu-item.interface";

export const CreateMenuItemSchema = z.object({
  id: z.string().min(1, "ID is required"),

  name: z.string().min(1, "Name is required"),

  category: z.nativeEnum(FoodCategory, {
    message: "Invalid food category",
  }),

  price: z.number().positive("Price must be a positive number"),

  available: z.boolean(),
});

export class CreateMenuItemDto {
  declare id: string;

  declare name: string;

  declare category: FoodCategory;

  declare price: number;

  declare available: boolean;
}
