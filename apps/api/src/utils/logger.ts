import { createLogger, transports, format } from 'winston';

/**
 * Logger utility using Winston.
 * Outputs logs to console and files with timestamped messages.
 */

// Define the log format
const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.errors({ stack: true }), // Include stack trace for errors
  format.printf(
    ({ timestamp, level, message, stack }) =>
      `[${timestamp}] ${level}: ${stack || message}`
  ) // Customize log format with stack trace
);

// Create the logger instance
const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info', // Use LOG_LEVEL env variable or default to 'info'
  format: logFormat,
  transports: [
    // Log all levels to a combined file
    new transports.File({ filename: 'logs/combined.log', level: 'info' }),

    // Log errors to a separate file
    new transports.File({ filename: 'logs/error.log', level: 'error' }),

    // Always log to the console
    new transports.Console({
      format: format.combine(
        format.colorize(), // Add colorized output for console
        format.simple() // Simpler format for readability in console
      ),
    }),
  ],
});

export default logger;
