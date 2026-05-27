import { MenuRepository } from "./menu.repository";

import { MenuItem } from "./interfaces/menu-item.interface";

import { CreateMenuItemDto } from "./dto/create-menu-item.dto";

import { UpdateMenuItemDto } from "./dto/update-menu-item.dto";

export class MenuService {
  constructor(
    private readonly menuRepository: MenuRepository
  ) {}

  async createMenuItem(
    dto: CreateMenuItemDto
  ): Promise<MenuItem> {
    await this.simulateDatabaseDelay();

    const newMenuItem: MenuItem = {
      ...dto,

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

  async updateMenuItem(
    id: string,
    dto: UpdateMenuItemDto
  ): Promise<MenuItem | undefined> {
    await this.simulateDatabaseDelay();

    const updated = this.menuRepository.update(id, {
      ...dto,
      updatedAt: new Date(),
    });

    return updated;
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