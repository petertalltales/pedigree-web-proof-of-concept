// Needs to more gracefully handle database connection errors, this is barebones

import dotenv from 'dotenv';
import path from 'path';
import app from './router';
import pool from './config/db';
import logger from './utils/logger';

dotenv.config();

const PORT = process.env.PORT || 8080;

// Test the database connection
pool
  .connect()
  .then((client) => {
    client.release();
    logger.info('Database connection established successfully.');

    // Start the server
    app.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    if (err instanceof Error) {
      logger.error(`Failed to connect to the database: ${err.message}`);
    } else {
      logger.error('An unknown error occurred during database connection.');
    }
    process.exit(1); // Exit the application on failure
  });
