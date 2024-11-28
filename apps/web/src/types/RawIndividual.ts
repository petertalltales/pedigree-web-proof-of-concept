// src/shared/types/RawIndividual.ts

/**
 * Type representing the raw data format returned by the API.
 */
export interface RawIndividual {
  id: string;
  name?: string;
  birth_date?: string;
  breed?: string;
  gender?: string;
  trait?: string;
  father_id?: string | number;
  mother_id?: string | number;
  deceased?: string;
  founder?: string;
  inbreeding?: number;
}
