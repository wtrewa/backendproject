import { NextFunction, Request, Response } from "express";
import { ValidationError } from "sequelize";

class CustomError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }
}

export const errorHandler = (
  err: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({
      message: "Validation error",
      details: err.errors.map((error) => error.message),
    });
  }
  if (err instanceof CustomError) {
    return res.status(err.statusCode || 500).json({
      message: err.message || "Internal Server Error",
    });
  }
};

export const createCustomError = (statusCode: number, message: string) => {
  return new CustomError(statusCode, message);
};
