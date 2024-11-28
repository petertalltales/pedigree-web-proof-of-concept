import { ValidPaths, PathPair } from '../../types/pedigreeTypes';
import logger from '../../utils/logger';

/**
 * Calculates the inbreeding coefficient for an individual based on valid ancestral path pairs.
 * @param validPathsObject - The ValidPaths object containing valid path pairs.
 * @returns The calculated inbreeding coefficient as a number.
 */
export const calculateCoefficient = (validPathsObject: ValidPaths): number => {
  const { valid_paths } = validPathsObject;

  // Calculate contributions for all valid path pairs
  const contributions = valid_paths.map((pair) => {
    const contribution = calculatePairContribution(pair);
    return contribution;
  });

  // Sum contributions to compute the inbreeding coefficient (fX)
  const fX = contributions.reduce((sum, contribution) => sum + contribution, 0);

  // Return the result rounded to 6 decimal places
  return parseFloat(fX.toFixed(6));
};

/**
 * Calculates the contribution of a single PathPair to the inbreeding coefficient.
 * @param pair - The PathPair containing the paternal and maternal paths and other data.
 * @returns The contribution as a number.
 * @throws Error if `common_ancestor_inbreeding` is not set.
 */
export const calculatePairContribution = (pair: PathPair): number => {
  const { generations, common_ancestor_inbreeding } = pair;

  // Ensure `common_ancestor_inbreeding` is set
  if (
    common_ancestor_inbreeding === null ||
    common_ancestor_inbreeding === undefined
  ) {
    throw new Error('Common ancestor inbreeding value is not set.');
  }

  const powerTerm = Math.pow(0.5, generations);
  const factor = 1 + common_ancestor_inbreeding;
  const contribution = powerTerm * factor;

  // Return contribution
  return contribution;
};
