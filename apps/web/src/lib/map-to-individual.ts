// src/shared/utils/mapToIndividual.ts

import { Individual } from '../types/Individual';

/**
 * Maps a raw data object to an Individual.
 * Extracts only the relevant fields defined in the Individual interface.
 * Ignores extra or dynamic fields in the raw data.
 * @param rawData - The raw data object from the API.
 * @returns An Individual object.
 */
export const mapToIndividual = <T extends Partial<Individual>>(
  rawData: T
): Individual => {
  return {
    id: rawData.id ?? '',
    name: rawData.name ?? null,
    birth_date: rawData.birth_date ?? null,
    breed: rawData.breed ?? null,
    gender: rawData.gender ?? null,
    trait: rawData.trait ?? null,
    father_id: rawData.father_id ?? null,
    mother_id: rawData.mother_id ?? null,
    deceased: rawData.deceased ?? null,
    founder: rawData.founder ?? null,
    inbreeding: rawData.inbreeding ?? null,
  };
};
