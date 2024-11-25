// Started standardizing the types, much work to do, very satisfying

export type Individual = {
  id: string;
  name?: string | null;
  birth_date?: Date | null;
  breed?: string | null;
  gender?: 'M' | 'F' | null;
  trait?: string | null;
  father_id?: string | null;
  mother_id?: string | null;
  deceased?: 'Yes' | 'No' | null;
  death_date?: Date | null;
  founder?: 'Yes' | 'No' | null;
  inbreeding?: number | null;
};
/**
 * Represents a single path with an ID and an array of related IDs.
 */
export type Path = {
  path: string[];
};
export type FamilyTree = {
  individual: Individual;
  paternal_paths: Path[];
  maternal_paths: Path[];
};
export type PathPair = {
  paternal_path: Path;
  maternal_path: Path;
};
export type ValidPaths = {
  individual: Individual;
  valid_paths: PathPair[];
};
