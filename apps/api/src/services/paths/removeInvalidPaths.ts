// I sat down with pen & paper and learned the formula, and found the invalidators needed to
//disqualify pairs, very fun, but I think a graph-database would handle the task of finding the
//paths and instantly invalidating them much better. All depends on scale

import { PathPair, ValidPaths, FamilyTree } from '../../types/Individual';

/**
 * Filters invalid paths from the given FamilyTree and generates valid PathPairs.
 * @param familyTree - The FamilyTree object containing all paternal and maternal paths.
 * @returns A ValidPaths object containing the individual and an array of valid PathPairs.
 */
export const removeInvalidPaths = (familyTree: FamilyTree): ValidPaths => {
  const validPaths: PathPair[] = [];

  /**
   * Checks if two paths share intermediates other than the last ancestor.
   * @param paternalPath - The paternal path array.
   * @param maternalPath - The maternal path array.
   * @returns True if shared intermediates exist; otherwise, false.
   */
  const hasSharedIntermediates = (
    paternalPath: string[],
    maternalPath: string[]
  ): boolean => {
    const paternalIntermediates = paternalPath.slice(0, -1); // Exclude last ancestor
    const maternalIntermediates = maternalPath.slice(0, -1); // Exclude last ancestor
    return paternalIntermediates.some((id) =>
      maternalIntermediates.includes(id)
    );
  };

  /**
   * Processes and validates a pair of paternal and maternal paths.
   * @param paternalPathObj - The paternal path object.
   * @param maternalPathObj - The maternal path object.
   */
  const validateAndAddPathPair = (
    paternalPathObj: { path: string[] },
    maternalPathObj: { path: string[] }
  ): void => {
    const paternalPath = paternalPathObj.path;
    const maternalPath = maternalPathObj.path;

    // Check if both paths end with the same ancestor and have no shared intermediates
    if (
      paternalPath[paternalPath.length - 1] ===
        maternalPath[maternalPath.length - 1] &&
      !hasSharedIntermediates(paternalPath, maternalPath)
    ) {
      validPaths.push({
        paternal_path: paternalPathObj,
        maternal_path: maternalPathObj,
      });
    }
  };

  // Process all combinations of paternal and maternal paths
  for (const paternalPathObj of familyTree.paternal_paths) {
    for (const maternalPathObj of familyTree.maternal_paths) {
      validateAndAddPathPair(paternalPathObj, maternalPathObj);
    }
  }

  // Construct the ValidPaths result object
  return {
    individual: familyTree.individual,
    valid_paths: validPaths,
  };
};
