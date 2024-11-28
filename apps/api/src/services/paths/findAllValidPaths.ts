import {
  Individual,
  Path,
  PathPair,
  ValidPaths,
} from '../../types/pedigreeTypes';

/**
 * Finds all valid paths for a given individual using a map of all individuals.
 * @param individualMap - A Map of all individuals keyed by their ID.
 * @param individual - The individual for whom valid paths are to be found.
 * @returns A ValidPaths object containing the individual and valid PathPairs.
 */
export const findAllValidPaths = async (
  individualMap: Map<string, Individual>,
  individual: Individual
): Promise<ValidPaths> => {
  if (!individual) {
    throw new Error('Invalid individual provided.');
  }

  // Step 1: Generate paternal and maternal paths
  const paternalPaths = generateAncestorPaths(
    individualMap,
    individual.father_id
  );
  const maternalPaths = generateAncestorPaths(
    individualMap,
    individual.mother_id
  );

  // Step 2: Generate valid path pairs
  const validPathPairs = generateValidPathPairs(paternalPaths, maternalPaths);

  // Step 3: Return the ValidPaths object
  return {
    individual,
    valid_paths: validPathPairs,
  };
};

/**
 * Recursively generates ancestor paths for a given parent ID.
 * @param individualMap - A Map of all individuals keyed by their ID.
 * @param parentId - The parent ID whose ancestry paths need to be built.
 * @returns An array of paths.
 */
const generateAncestorPaths = (
  individualMap: Map<string, Individual>,
  parentId?: string
): Path[] => {
  if (!parentId) return [];

  const parent = individualMap.get(parentId);
  if (!parent) return [];

  const paths: Path[] = [];
  const currentPath = [parentId];

  // Add the current path
  paths.push({ path: currentPath });

  // Recursively process both paternal and maternal ancestry
  if (parent.father_id) {
    const paternalPaths = generateAncestorPaths(
      individualMap,
      parent.father_id.toString()
    );
    paternalPaths.forEach((path) =>
      paths.push({ path: [...currentPath, ...path.path] })
    );
  }

  if (parent.mother_id) {
    const maternalPaths = generateAncestorPaths(
      individualMap,
      parent.mother_id.toString()
    );
    maternalPaths.forEach((path) =>
      paths.push({ path: [...currentPath, ...path.path] })
    );
  }

  return paths;
};

/**
 * Generates valid path pairs by combining paternal and maternal paths.
 * @param paternalPaths - An array of paternal paths.
 * @param maternalPaths - An array of maternal paths.
 * @returns An array of valid PathPairs.
 */
const generateValidPathPairs = (
  paternalPaths: Path[],
  maternalPaths: Path[]
): PathPair[] => {
  const validPathPairs: PathPair[] = [];

  for (const paternalPathObj of paternalPaths) {
    for (const maternalPathObj of maternalPaths) {
      validateAndAddPathPair(paternalPathObj, maternalPathObj, validPathPairs);
    }
  }

  return validPathPairs;
};

/**
 * Validates a pair of paths and adds them to the validPathPairs array if valid.
 * @param paternalPathObj - The paternal path object.
 * @param maternalPathObj - The maternal path object.
 * @param validPathPairs - The array to store valid PathPairs.
 */
const validateAndAddPathPair = (
  paternalPathObj: Path,
  maternalPathObj: Path,
  validPathPairs: PathPair[]
): void => {
  const paternalPath = paternalPathObj.path;
  const maternalPath = maternalPathObj.path;

  if (
    paternalPath[paternalPath.length - 1] ===
      maternalPath[maternalPath.length - 1] &&
    !hasSharedIntermediates(paternalPath, maternalPath)
  ) {
    validPathPairs.push({
      paternal_path: paternalPathObj,
      maternal_path: maternalPathObj,
      common_ancestor: paternalPath[paternalPath.length - 1], // Extract common ancestor
      generations: paternalPath.length + maternalPath.length - 1, // Total generations
    });
  }
};

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
  const paternalIntermediates = paternalPath.slice(0, -1);
  const maternalIntermediates = maternalPath.slice(0, -1);
  return paternalIntermediates.some((id) => maternalIntermediates.includes(id));
};
