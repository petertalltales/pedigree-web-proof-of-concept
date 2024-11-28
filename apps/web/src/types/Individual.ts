// This needs to be a shared type in the monorepo, will make coding so much easier.

export interface Individual {
  id: string;
  name: string | null;
  birth_date: string | null;
  breed: string | null;
  gender: string | null;
  trait: string | null; //
  father_id: string | number | null;
  mother_id: string | number | null;
  deceased: string | null;
  founder: string | null;
  inbreeding: number | null;
}
