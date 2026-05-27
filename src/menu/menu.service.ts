import { MenuRepository } from "./menu.repository";

import {
  MenuItem,
} from "./interfaces/menu-item.interface";

export class MenuService {
  constructor(
    private readonly menuRepository: MenuRepository
  ) {}

  async createMenuItem(
    data: Omit<MenuItem, "createdAt" | "updatedAt">
  ): Promise<MenuItem> {
    await this.simulateDatabaseDelay();

    const newMenuItem: MenuItem = {
      ...data,

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
  ): Promise<MenuItem | undefined> {
    await this.simulateDatabaseDelay();

    return this.menuRepository.findById(id);
  }

  async deleteMenuItem(
    id: string
  ): Promise<boolean> {
    await this.simulateDatabaseDelay();

    return this.menuRepository.delete(id);
  }

  private async simulateDatabaseDelay(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  }
}