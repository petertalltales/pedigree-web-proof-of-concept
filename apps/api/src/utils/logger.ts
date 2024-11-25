// Quick logger to make sure I can figure out whats going right or wrong

import { createLogger, transports, format } from 'winston';

/**
 * Logger utility using Winston.
 * Outputs logs to console and files with timestamped messages.
 */

// Define the log format
const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.errors({ stack: true }), // Include stack trace for errors
  format.splat(),
  format.json()
);

// Create the logger instance
const logger = createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Log errors to file
    new transports.File({ filename: 'logs/combined.log' }), // Log all levels to file
  ],
});

// Log to console in non-production environments
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

export default logger;
