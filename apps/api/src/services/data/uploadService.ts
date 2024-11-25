import { parseCSVFile } from '../../utils/fileParser';
import { validateData } from '../../utils/validateData';
import { clearData, insertData } from './dataService';
import { deleteFile } from '../../utils/fileCleanup';
import logger from '../../utils/logger';

/**
 * Processes the uploaded file: parses it, validates data, and inserts it into the database.
 * @param filePath - Path to the uploaded file.
 */
export const processUploadedFile = async (filePath: string): Promise<void> => {
  try {
    // Parse the CSV file
    const individuals = await parseCSVFile(filePath);

    // Validate data
    validateData(individuals);

    // Clear the individuals table
    await clearData();

    // Insert parsed data into the database
    await insertData(individuals);
  } catch (error) {
    logger.error('Error processing uploaded file:', error);
    throw error;
  } finally {
    // Clean up the uploaded file
    deleteFile(filePath);
  }
};
