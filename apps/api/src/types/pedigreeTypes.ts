// src/types/Individual.ts

export type Individual = {
  id: string;
  name?: string | null;
  birth_date?: Date | null;
  breed?: string | null;
  gender?: string | null;
  trait?: string | null;
  father_id?: string | null;
  mother_id?: string | null;
  deceased?: string | null;
  death_date?: Date | null;
  founder?: string | null;
  inbreeding: number | null; // Ensured to be non-optional
};

/**
 * Represents a single path with an array of related IDs.
 */
export type Path = {
  path: string[];
};

/**
 * Represents a pair of paternal and maternal paths.
 */
export type PathPair = {
  paternal_path: Path;
  maternal_path: Path;
  generations: number;
  common_ancestor?: string | null;
  common_ancestor_inbreeding?: number | null;
};

/**
 * Represents the valid ancestral paths and common ancestors for an individual.
 */
export type ValidPaths = {
  individual: Individual;
  valid_paths: PathPair[];
};

export type Stack<T> = T[];

export type ProcessQueue = {
  queue_inbreeding_calculate: Stack<ValidPaths>;
  queue_inbreeding_zero: Stack<Individual>;
};
