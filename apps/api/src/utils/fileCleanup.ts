// src/utils/fileCleanup.ts
import fs from 'fs';
import logger from './logger';

/**
 * Deletes a file at the specified path.
 * @param filePath - Path to the file to delete.
 */
export const deleteFile = (filePath: string): void => {
  fs.unlink(filePath, (err) => {
    if (err) {
      logger.error(`Error deleting file at ${filePath}:`, err);
    }
  });
};
