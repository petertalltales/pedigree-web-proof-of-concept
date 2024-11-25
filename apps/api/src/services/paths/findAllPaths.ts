// Creates every single path backwards in a family tree to be vaildated later.
// This beat SQL queries by a long shot, but it's not optimized

import { getIndividual } from '../data/dataService';
import { Individual, Path, FamilyTree } from '../../types/Individual';

/**
 * Recursively finds all ancestor paths for a given individual.
 * @param individual - The Individual object for which ancestor paths are to be found.
 * @returns A FamilyTree object containing all paternal and maternal paths.
 */
export const findAllPaths = async (
  individual: Individual
): Promise<FamilyTree> => {
  if (!individual) {
    throw new Error('Invalid individual provided.');
  }

  /**
   * Recursively builds ancestor paths for a given parent ID.
   * @param parentId - The parent ID whose ancestry paths need to be built.
   * @param currentPath - The current path under construction.
   * @returns A promise resolving to an array of paths.
   */
  const buildAncestorPaths = async (
    parentId: string,
    currentPath: string[]
  ): Promise<Path[]> => {
    const parent = await getIndividual(parentId);
    if (!parent) return []; // Terminate recursion if parent is not found.

    const newPath = [...currentPath, parentId];
    const paths: Path[] = [];

    // Add the current path if it has more than one ancestor
    if (newPath.length > 1) {
      paths.push({ path: newPath });
    }

    // Recursively process both paternal and maternal ancestry
    if (parent.father_id) {
      paths.push(
        ...(await buildAncestorPaths(parent.father_id.toString(), newPath))
      );
    }
    if (parent.mother_id) {
      paths.push(
        ...(await buildAncestorPaths(parent.mother_id.toString(), newPath))
      );
    }

    return paths;
  };

  /**
   * Processes all paths for a given parent ID and stores them in the FamilyTree object.
   * @param parentId - The parent ID to process.
   * @returns A promise resolving to an array of paths.
   */
  const processParentPaths = async (parentId?: string): Promise<Path[]> => {
    return parentId ? buildAncestorPaths(parentId.toString(), []) : [];
  };

  // Build the FamilyTree object
  const familyTree: FamilyTree = {
    individual,
    paternal_paths: await processParentPaths(individual.father_id ?? undefined),
    maternal_paths: await processParentPaths(individual.mother_id ?? undefined),
  };

  return familyTree;
};
