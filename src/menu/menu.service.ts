import { MenuRepository } from "./menu.repository";

import { MenuItem } from "./interfaces/menu-item.interface";

import {
  CreateMenuItemDto,
  CreateMenuItemSchema,
} from "./dto/create-menu-item.dto";

import {
  UpdateMenuItemDto,
  UpdateMenuItemSchema,
} from "./dto/update-menu-item.dto";

import { NotFoundError } from "../common/errors/not-found.error";

import { ValidationError } from "../common/errors/validation.error";

export class MenuService {
  constructor(
    private readonly menuRepository: MenuRepository
  ) {}

  async createMenuItem(
    dto: CreateMenuItemDto
  ): Promise<MenuItem> {
    await this.simulateDatabaseDelay();

    const result = CreateMenuItemSchema.safeParse(dto);

    if (!result.success) {
      const issues = result.error.issues.map(
        (i) => i.message
      );

      throw new ValidationError(issues);
    }

    const newMenuItem: MenuItem = {
      ...result.data,

      createdAt: new Date(),

      updatedAt: new Date(),
    };

    return this.menuRepository.create(newMenuItem);
  }

  async getAllMenuItems(): Promise<MenuItem[]> {
    await this.simulateDatabaseDelay();

    return this.menuRepository.findAll();
  }

  async getMenuItemById(
    id: string
  ): Promise<MenuItem> {
    await this.simulateDatabaseDelay();

    const item = this.menuRepository.findById(id);

    if (!item) {
      throw new NotFoundError("MenuItem", id);
    }

    return item;
  }

  async updateMenuItem(
    id: string,
    dto: UpdateMenuItemDto
  ): Promise<MenuItem> {
    await this.simulateDatabaseDelay();

    const result = UpdateMenuItemSchema.safeParse(dto);

    if (!result.success) {
      const issues = result.error.issues.map(
        (i) => i.message
      );

      throw new ValidationError(issues);
    }

    const updated = this.menuRepository.update(id, {
      ...result.data,
      updatedAt: new Date(),
    });

    if (!updated) {
      throw new NotFoundError("MenuItem", id);
    }

    return updated;
  }

  async deleteMenuItem(
    id: string
  ): Promise<boolean> {
    await this.simulateDatabaseDelay();

    const deleted = this.menuRepository.delete(id);

    if (!deleted) {
      throw new NotFoundError("MenuItem", id);
    }

    return deleted;
  }

  private async simulateDatabaseDelay(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  }
}