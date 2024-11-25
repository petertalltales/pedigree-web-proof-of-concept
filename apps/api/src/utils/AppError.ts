// src/utils/AppError.ts

/**
 * Custom AppError class extends the native Error class.
 * Includes additional properties like statusCode and isOperational
 * to differentiate between operational and programming errors.
 */
class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
