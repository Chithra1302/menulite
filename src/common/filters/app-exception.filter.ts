import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";

import { Request, Response } from "express";

import { AppError } from "../errors/app.error";

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    const request = ctx.getRequest<Request>();

    if (exception instanceof AppError) {
      response.status(exception.statusCode).json({
        statusCode: exception.statusCode,
        error: exception.name,
        message: exception.message,
        path: request.url,
        timestamp: new Date().toISOString(),
      });

      return;
    }

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json({
        statusCode: exception.getStatus(),
        error: "HttpException",
        message: exception.message,
        path: request.url,
        timestamp: new Date().toISOString(),
      });

      return;
    }

    response.status(500).json({
      statusCode: 500,
      error: "InternalServerError",
      message: "An unexpected error occurred",
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
