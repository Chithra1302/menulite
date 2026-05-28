import "reflect-metadata";

import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

import { AppExceptionFilter } from "./common/filters/app-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AppExceptionFilter());

  await app.listen(3000);

  console.log("MenuLite API is running on http://localhost:3000");
  console.log("\nAvailable endpoints:");
  console.log("  POST   http://localhost:3000/menu");
  console.log("  GET    http://localhost:3000/menu");
  console.log("  GET    http://localhost:3000/menu/:id");
  console.log("  PATCH  http://localhost:3000/menu/:id");
  console.log("  DELETE http://localhost:3000/menu/:id");
}

bootstrap();