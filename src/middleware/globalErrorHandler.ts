import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status";
import { ZodError } from "zod";
import { Prisma } from "../../generated/prisma/client";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode ;
  let message = "Something went wrong";
  let errorDetails: unknown = null;

  /**
   * Zod Validation Error
   */
  if (err instanceof ZodError) {
    statusCode = HttpStatus.BAD_REQUEST;
    message = "Validation Error";

    errorDetails = err.errors.map((error) => ({
      path: error.path.join("."),
      message: error.message,
    }));
  }

  /**
   * Prisma Validation Error
   */
  else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = HttpStatus.BAD_REQUEST;
    message = err.message;
  }

  /**
   * Prisma Known Error
   */
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        statusCode = HttpStatus.CONFLICT;
        message = "Duplicate value found.";
        break;

      case "P2003":
        statusCode = HttpStatus.BAD_REQUEST;
        message = "Foreign key constraint failed.";
        break;

      case "P2025":
        statusCode = HttpStatus.NOT_FOUND;
        message = "Record not found.";
        break;

      default:
        statusCode = HttpStatus.BAD_REQUEST;
        message = err.message;
    }
  }

  /**
   * Prisma Initialization Error
   */
  else if (err instanceof Prisma.PrismaClientInitializationError) {
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    message = "Database connection failed.";
  }

  /**
   * Normal Error
   */
  else if (err instanceof Error) {
    statusCode = HttpStatus.BAD_REQUEST;
    message = err.message;
  }

  res.status(statusCode || 500).json({
    success: false,
    statusCode,
    message,
    errors: errorDetails,
    ...(process.env.NODE_ENV !== "production" && {
      stack: err.stack,
    }),
  });
};