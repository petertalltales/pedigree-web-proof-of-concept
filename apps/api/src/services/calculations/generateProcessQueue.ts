// src/services/calculations/generateProcessQueue.ts

import { Individual, ProcessQueue } from '../../types/pedigreeTypes';
import { findAllValidPaths } from '../paths/findAllValidPaths';

/**
 * Generates a ProcessQueue for calculating inbreeding coefficients and identifying individuals with no valid paths.
 * @param individual - The starting individual for the process.
 * @param pedigree - The full pedigree as a Map of all individuals keyed by their ID.
 * @returns A ProcessQueue object containing the inbreeding calculation and zero inbreeding stacks.
 */
export const generateProcessQueue = async (
  individual: Individual,
  pedigree: Map<string, Individual>
): Promise<ProcessQueue> => {
  // Initialize the ProcessQueue as stacks
  const processQueue: ProcessQueue = {
    queue_inbreeding_calculate: [],
    queue_inbreeding_zero: [],
  };

  /**
   * Recursively processes an individual to populate the processQueue.
   * @param currentIndividual - The individual to process.
   */
  const processIndividual = async (currentIndividual: Individual) => {
    // Call findAllValidPaths for the current individual
    const validPaths = await findAllValidPaths(pedigree, currentIndividual);

    // If no valid paths, push the individual to queue_inbreeding_zero
    if (!validPaths.valid_paths.length) {
      processQueue.queue_inbreeding_zero.push(currentIndividual);
      return;
    }

    // Recursively process common ancestors in the valid paths
    for (const pathPair of validPaths.valid_paths) {
      const commonAncestorId = pathPair.common_ancestor;

      // Throw an error if commonAncestorId is not a valid string
      if (typeof commonAncestorId !== 'string') {
        throw new Error(
          `Invalid commonAncestorId encountered: ${commonAncestorId}`
        );
      }

      const commonAncestor = pedigree.get(commonAncestorId);

      if (commonAncestor) {
        await processIndividual(commonAncestor);
      } else {
        throw new Error(
          `Common ancestor with ID ${commonAncestorId} not found in pedigree.`
        );
      }
    }

    // After processing ancestors, push the valid paths to queue_inbreeding_calculate
    processQueue.queue_inbreeding_calculate.push(validPaths);
  };

  // Start processing the given individual
  await processIndividual(individual);

  // Return the final ProcessQueue
  return processQueue;
};
