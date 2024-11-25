//This calls findAllPaths and removeInvalidPaths, to create a list of common ancestors
//and the data needed to calculate their inbreeding coefficient

import { findAllPaths } from './findAllPaths';
import { removeInvalidPaths } from './removeInvalidPaths';
import { Individual, ValidPaths } from '../../types/Individual';

/**
 * Retrieves and validates all ancestral paths for a specific individual.
 * @param individual - The Individual object to process.
 * @returns A ValidPaths object containing only valid ancestral paths.
 */
export const getValidPaths = async (
  individual: Individual
): Promise<ValidPaths> => {
  try {
    // Step 1: Retrieve all ancestor paths (both paternal and maternal)
    const familyTree = await findAllPaths(individual);

    // Step 2: Filter out invalid paths from the FamilyTree
    const validPaths = await removeInvalidPaths(familyTree);

    // Step 3: Return the cleaned and validated paths
    return validPaths;
  } catch (error) {
    // Log and rethrow the error for debugging and error handling
    console.error(
      `Error in getValidPaths for Individual ID: ${individual.id}`,
      error
    );
    throw error;
  }
};
