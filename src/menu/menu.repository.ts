import { Injectable } from "@nestjs/common";

import { BaseRepository } from "../common/result/base.repository";

import { MenuItem } from "./interfaces/menu-item.interface";

@Injectable()
export class MenuRepository extends BaseRepository<MenuItem> {}