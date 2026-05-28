import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from "@nestjs/common";

import { MenuService } from "./menu.service";

import { CreateMenuItemDto } from "./dto/create-menu-item.dto";

import { UpdateMenuItemDto } from "./dto/update-menu-item.dto";

import { MenuItem } from "./interfaces/menu-item.interface";

@Controller("menu")
export class MenuController {
  constructor(
    private readonly menuService: MenuService
  ) {}

  @Post()
  async create(
    @Body() dto: CreateMenuItemDto
  ): Promise<MenuItem> {
    return this.menuService.createMenuItem(dto);
  }

  @Get()
  async findAll(): Promise<MenuItem[]> {
    return this.menuService.getAllMenuItems();
  }

  @Get(":id")
  async findOne(
    @Param("id") id: string
  ): Promise<MenuItem> {
    return this.menuService.getMenuItemById(id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() dto: UpdateMenuItemDto
  ): Promise<MenuItem> {
    return this.menuService.updateMenuItem(id, dto);
  }

  @Delete(":id")
  async remove(
    @Param("id") id: string
  ): Promise<{ deleted: boolean }> {
    const deleted = await this.menuService.deleteMenuItem(id);

    return { deleted };
  }
}
