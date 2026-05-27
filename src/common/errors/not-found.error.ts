import { AppError } from "./app.error";

export class NotFoundError extends AppError {
  constructor(resource: string, id: string) {
    super(`${resource} with id "${id}" was not found.`, 404);
  }
}
