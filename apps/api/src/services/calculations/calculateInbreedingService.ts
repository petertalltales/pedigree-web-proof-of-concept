//Recursive function that does the heavy lifting, heavy on the RAM and databasecalls, but good enough for proof of concept
//I am obsessed with how much this can be optimized if I had the time

import {
  getIndividual,
  updateInbreedingCoefficient,
  fetchData,
} from '../data/dataService';
import { getValidPaths } from '../paths/getValidPaths';
import { calculateCoefficient } from './calculateCoefficient';
import logger from '../../utils/logger';

/**
 * Calculates and updates the inbreeding coefficient for a specific individual.
 * @param id - Registration number of the individual to process.
 */
export const calculateInbreeding = async (id: string): Promise<void> => {
  try {
    // Step 1: Fetch the individual
    const individual = await getIndividual(id);

    if (!individual) {
      console.log(`Individual with id ${id} not found.`);
      return;
    }

    // Step 2: Skip if inbreeding coefficient is already set (not null)
    if (individual.inbreeding !== null) {
      return;
    }

    // Step 3: Retrieve valid ancestral path pairs
    const validPaths = await getValidPaths(individual);

    if (validPaths.valid_paths.length === 0) {
      await updateInbreedingCoefficient(individual.id, 0);
      return;
    }

    // Step 4: Calculate inbreeding coefficient
    const calculatedFInbreeding = await calculateCoefficient(validPaths);

    // Step 5: Update inbreeding coefficient in the database
    await updateInbreedingCoefficient(individual.id, calculatedFInbreeding);
  } catch (error) {
    logger.error(`Error setting inbreeding for individual ${id}:`, error);
    throw error;
  }
};

/**
 * Calculates and updates the inbreeding coefficient for all individuals in the database.
 * Processes individuals in ascending order of birth_date.
 */
export const calculateInbreedingForAll = async (): Promise<void> => {
  try {
    // Step 1: Fetch all individuals
    const allIndividuals = await fetchData();

    if (!allIndividuals || allIndividuals.length === 0) {
      console.log('No individuals found in the database.');
      return;
    }

    // Step 2: Sort individuals by birth_date in ascending order
    const sortedIndividuals = allIndividuals.sort((a, b) => {
      const dateA = a.birth_date ? new Date(a.birth_date).getTime() : 0;
      const dateB = b.birth_date ? new Date(b.birth_date).getTime() : 0;
      return dateA - dateB;
    });

    // Step 3: Calculate inbreeding coefficient for each individual
    for (const individual of sortedIndividuals) {
      // Skip individuals whose inbreeding coefficient is already set (not null)
      if (individual.inbreeding !== null) {
        continue;
      }

      // Calculate inbreeding coefficient
      await calculateInbreeding(individual.id);
    }
  } catch (error) {
    logger.error('Error calculating inbreeding for all individuals:', error);
    throw error;
  }
};
