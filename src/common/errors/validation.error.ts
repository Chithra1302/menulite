import { AppError } from "./app.error";

export class ValidationError extends AppError {
  constructor(public readonly issues: string[]) {
    super(`Validation failed: ${issues.join(", ")}`, 422);
  }
}
