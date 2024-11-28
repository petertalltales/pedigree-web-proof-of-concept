import { Request, Response } from 'express';
import logger from '../utils/logger';
import AppError from '../utils/AppError';

/**
 * Global error handler for the application.
 * Logs errors and sends a JSON response with the error message and status code.
 */
export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response
): void => {
  logger.error(err.stack || err.message);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
  });
};
