import { ArgumentsHost, HttpException } from "@nestjs/common";
import { AppExceptionFilter } from "./app-exception.filter";
import { NotFoundError } from "../errors/not-found.error";
import { ValidationError } from "../errors/validation.error";

// ─── Mock helpers ─────────────────────────────────────────────────────────────

const mockResponse = () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return res;
};

const mockRequest = (url = "/menu") => ({ url });

const mockHost = (url?: string): ArgumentsHost =>
  ({
    switchToHttp: () => ({
      getResponse: () => mockResponse(),
      getRequest: () => mockRequest(url),
    }),
  }) as unknown as ArgumentsHost;

// ─── Suite ────────────────────────────────────────────────────────────────────

describe("AppExceptionFilter", () => {
  let filter: AppExceptionFilter;

  beforeEach(() => {
    filter = new AppExceptionFilter();
  });

  // ─── AppError subclasses ───────────────────────────────────────────────────

  describe("when exception is NotFoundError", () => {
    it("responds with status 404 and correct error shape", () => {
      const exception = new NotFoundError("MenuItem", "abc-123");
      const res = mockResponse();
      const host = {
        switchToHttp: () => ({
          getResponse: () => res,
          getRequest: () => mockRequest("/menu/abc-123"),
        }),
      } as unknown as ArgumentsHost;

      filter.catch(exception, host);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 404,
          error: "NotFoundError",
          path: "/menu/abc-123",
        })
      );
    });
  });

  describe("when exception is ValidationError", () => {
    it("responds with status 422 and lists validation issues", () => {
      const exception = new ValidationError(["Name is required", "Price must be a positive number"]);
      const res = mockResponse();
      const host = {
        switchToHttp: () => ({
          getResponse: () => res,
          getRequest: () => mockRequest("/menu"),
        }),
      } as unknown as ArgumentsHost;

      filter.catch(exception, host);

      expect(res.status).toHaveBeenCalledWith(422);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 422,
          error: "ValidationError",
        })
      );
    });
  });

  // ─── NestJS HttpException ──────────────────────────────────────────────────

  describe("when exception is HttpException", () => {
    it("responds with the HttpException status code", () => {
      const exception = new HttpException("Forbidden", 403);
      const res = mockResponse();
      const host = {
        switchToHttp: () => ({
          getResponse: () => res,
          getRequest: () => mockRequest("/menu"),
        }),
      } as unknown as ArgumentsHost;

      filter.catch(exception, host);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 403,
          error: "HttpException",
        })
      );
    });
  });

  // ─── Unknown errors ────────────────────────────────────────────────────────

  describe("when exception is unknown", () => {
    it("responds with status 500 and generic message", () => {
      const exception = new Error("Something exploded");
      const res = mockResponse();
      const host = {
        switchToHttp: () => ({
          getResponse: () => res,
          getRequest: () => mockRequest("/menu"),
        }),
      } as unknown as ArgumentsHost;

      filter.catch(exception, host);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 500,
          error: "InternalServerError",
          message: "An unexpected error occurred",
        })
      );
    });
  });
});
