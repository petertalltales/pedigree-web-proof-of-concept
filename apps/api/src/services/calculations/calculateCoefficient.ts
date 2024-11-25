// This was a doozy, figuring out how to turn the inbreeding calculation into code was so much fun
// This was done to prove that it wasn't that hard to do, but optimizing it, that's another story
// Benchmarking data structures between relational and graph-databases will be interesting

import { getIndividual } from '../data/dataService';
import { calculateInbreeding } from './calculateInbreedingService';
import { Individual, PathPair, ValidPaths } from '../../types/Individual';

/**
 * Retrieves and ensures the common ancestor has a valid inbreeding coefficient.
 * @param commonAncestorId - The ID of the common ancestor.
 * @returns The Individual object with a valid inbreeding coefficient.
 */
const ensureInbreedingForAncestor = async (
  commonAncestorId: string
): Promise<Individual> => {
  let ancestor = await getIndividual(commonAncestorId);

  if (!ancestor) {
    throw new Error(`Common ancestor with ID ${commonAncestorId} not found.`);
  }

  // If inbreeding coefficient is missing, calculate it
  if (ancestor.inbreeding == null) {
    await calculateInbreeding(commonAncestorId); // Recalculate inbreeding
    ancestor = await getIndividual(commonAncestorId); // Refresh the ancestor data
    if (!ancestor || ancestor.inbreeding == null) {
      throw new Error(
        `Unable to calculate inbreeding for ancestor ID ${commonAncestorId}.`
      );
    }
  }

  return ancestor;
};

/**
 * Calculates the contribution of a single PathPair to the inbreeding coefficient.
 * @param pair - The PathPair containing the paternal and maternal paths.
 * @returns The contribution as a number.
 */
const calculatePairContribution = async (pair: PathPair): Promise<number> => {
  const {
    paternal_path: { path: paternalPath },
    maternal_path: { path: maternalPath },
  } = pair;

  // Total number of generations in the path (n)
  const n = paternalPath.length + maternalPath.length;

  // Identify the common ancestor and ensure valid inbreeding coefficient
  const commonAncestorId = paternalPath[paternalPath.length - 1];
  const commonAncestor = await ensureInbreedingForAncestor(commonAncestorId);

  // Calculate contribution: 0.5^(n-1) * (1 + fA)
  const fA = Number(commonAncestor.inbreeding);
  return Math.pow(0.5, n - 1) * (1 + fA);
};

/**
 * Calculates the inbreeding coefficient for an individual based on valid ancestral path pairs.
 * @param validPathsObject - The ValidPaths object containing valid path pairs.
 * @returns The calculated inbreeding coefficient as a number.
 */
export const calculateCoefficient = async (
  validPathsObject: ValidPaths
): Promise<number> => {
  const { valid_paths } = validPathsObject;

  // Calculate contributions for all valid path pairs
  const contributions = await Promise.all(
    valid_paths.map(calculatePairContribution)
  );

  // Sum contributions to compute the inbreeding coefficient (fX)
  const fX = contributions.reduce((sum, contribution) => sum + contribution, 0);

  // Return the result rounded to 10 decimal places
  return parseFloat(fX.toFixed(10));
};
