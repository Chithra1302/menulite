export enum FoodCategory {
  BEVERAGE = "BEVERAGE",

  SNACK = "SNACK",

  DESSERT = "DESSERT",

  MAIN_COURSE = "MAIN_COURSE",
}

export interface MenuItem {
  readonly id: string;

  name: string;

  category: FoodCategory;

  price: number;

  available: boolean;

  readonly createdAt: Date;

  updatedAt: Date;
}