// Parses files.

import fs from 'fs';
import csvParser from 'csv-parser'; // Compatible with CommonJS modules
import logger from './logger';
import { Individual } from '../types/Individual';

/**
 * Parses a CSV file and converts it into an array of Individual objects.
 * @param filePath - Path to the CSV file.
 * @returns Promise resolving to an array of Individual objects.
 */
export const parseCSVFile = (filePath: string): Promise<Individual[]> => {
  const individuals: Individual[] = [];

  return new Promise<Individual[]>((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data: Record<string, any>) => {
        individuals.push({
          id: data.id,
          name: data.name || null,
          birth_date: data.birth_date ? new Date(data.birth_date) : null,
          breed: data.breed || null,
          gender: data.gender || null,
          trait: data.trait || null,
          father_id: data.father_id || null,
          mother_id: data.mother_id || null,
          deceased: data.deceased || null,
          death_date: data.death_date ? new Date(data.death_date) : null,
          founder: data.founder || null,
          inbreeding: data.inbreeding ? parseFloat(data.inbreeding) : null,
        });
      })
      .on('end', () => {
        logger.info(`Parsed ${individuals.length} records from CSV.`);
        resolve(individuals);
      })
      .on('error', (error: Error) => {
        logger.error('Error parsing CSV file:', error);
        reject(error);
      });
  });
};
