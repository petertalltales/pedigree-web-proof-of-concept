import {
  Individual,
  ValidPaths,
  ProcessQueue,
} from '../../types/pedigreeTypes';
import { findAllValidPaths } from '../paths/findAllValidPaths';
import { generateProcessQueue } from './generateProcessQueue';
import { calculateCoefficient } from './calculateCoefficient';
import { fetchData } from '../data/dataService';
import { updateInbreedingBulk } from '../data/dataService';
import { calculateFounders } from './calculateFounderService';
import { calculateUnknownFathers } from './calculateUnknownFathersService';
import logger from '../../utils/logger';

/**
 * Calculates inbreeding coefficients for all individuals in the pedigree map.
 * The pedigree is processed in descending birth date order.
 */
/**
 * Calculates inbreeding coefficients for all individuals in the pedigree map.
 * The pedigree is processed in descending birth date order.
 */
export const calculateInbreedingForAll = async (): Promise<void> => {
  await calculateFounders();
  await calculateUnknownFathers();
  const sortedIndividuals = await fetchAndSortIndividuals();
  const pedigree = initializePedigreeMap(sortedIndividuals);

  for (const [, individual] of pedigree) {
    await processIndividual(individual, pedigree);
  }

  await updateInbreedingBulk(pedigree);
};

/**
 * Fetches individuals and sorts them by birth_date in descending order.
 * @returns A promise that resolves to an array of sorted Individuals.
 */
const fetchAndSortIndividuals = async (): Promise<Individual[]> => {
  const individuals: Individual[] = await fetchData();

  return individuals.sort((a, b) => {
    const dateA = a.birth_date ? new Date(a.birth_date).getTime() : 0;
    const dateB = b.birth_date ? new Date(b.birth_date).getTime() : 0;
    return dateA - dateB;
  });
};

/**
 * Initializes the Pedigree map from the sorted individuals.
 * @param sortedIndividuals - Array of sorted Individuals.
 * @returns A Pedigree map.
 */
const initializePedigreeMap = (
  sortedIndividuals: Individual[]
): Map<string, Individual> => {
  return new Map(
    sortedIndividuals.map((individual) => [individual.id, individual])
  );
};

/**
 * Processes an individual to calculate their inbreeding coefficient.
 * @param individual - The Individual to process.
 * @param pedigree - The Pedigree map.
 */
const processIndividual = async (
  individual: Individual,
  pedigree: Map<string, Individual>
): Promise<void> => {
  if (individual.inbreeding !== null) {
    return;
  }

  const validPaths = await findAllValidPaths(pedigree, individual);

  if (!validPaths.valid_paths.length) {
    individual.inbreeding = 0;
    return;
  }

  await handleValidPaths(individual, validPaths, pedigree);
};

/**
 * Handles valid paths by updating path pairs and calculating inbreeding coefficients.
 * @param individual - The Individual being processed.
 * @param validPaths - The ValidPaths object for the individual.
 * @param pedigree - The Pedigree map.
 */
const handleValidPaths = async (
  individual: Individual,
  validPaths: ValidPaths,
  pedigree: Map<string, Individual>
): Promise<void> => {
  const [updatedValidPaths, allCommonAncestorsSet] =
    updatePathPairsWithInbreeding(validPaths, pedigree);

  if (allCommonAncestorsSet) {
    const coefficient = calculateCoefficient(updatedValidPaths);
    individual.inbreeding = coefficient;
    return;
  }
  // Call findAllValidPaths and get a PathPair

  // Log the individual's inbreeding and all PathPairs
  const processQueue = await generateProcessQueue(individual, pedigree);
  await handleProcessQueue(processQueue);

  if (
    processQueue.queue_inbreeding_zero.length === validPaths.valid_paths.length
  ) {
    individual.inbreeding = 0;
  } else {
    const [finalValidPaths] = updatePathPairsWithInbreeding(
      validPaths,
      pedigree
    );

    const coefficient = calculateCoefficient(finalValidPaths);
    individual.inbreeding = coefficient;
  }
};

/**
 * Processes the queue_inbreeding_zero by setting inbreeding to 0.
 * @param processQueue - The ProcessQueue object containing individuals to update.
 */
const handleProcessQueue = async (
  processQueue: ProcessQueue
): Promise<void> => {
  for (const zeroIndividual of processQueue.queue_inbreeding_zero) {
    zeroIndividual.inbreeding = 0;
  }
};

/**
 * Updates the `common_ancestor_inbreeding` field for all PathPairs in the ValidPaths object
 * using the provided Pedigree map and determines if all common ancestors are set.
 * @param validPaths - The ValidPaths object to update.
 * @param pedigree - The Pedigree map containing all individuals.
 * @returns A tuple containing the updated ValidPaths object and a boolean:
 *          - true if all common ancestors have inbreeding set,
 *          - false if any common ancestor is missing or its inbreeding is not set.
 */
const updatePathPairsWithInbreeding = (
  validPaths: ValidPaths,
  pedigree: Map<string, Individual>
): [ValidPaths, boolean] => {
  let allCommonAncestorsSet = true;

  for (const pathPair of validPaths.valid_paths) {
    if (pathPair.common_ancestor) {
      const commonAncestor = pedigree.get(pathPair.common_ancestor);
      if (commonAncestor && commonAncestor.inbreeding !== null) {
        pathPair.common_ancestor_inbreeding = commonAncestor.inbreeding;
      } else {
        allCommonAncestorsSet = false;
      }
    } else {
      allCommonAncestorsSet = false;
    }
  }

  return [validPaths, allCommonAncestorsSet];
};
