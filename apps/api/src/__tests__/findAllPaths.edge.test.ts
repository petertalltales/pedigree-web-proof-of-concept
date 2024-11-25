// These helped med find out that the code did not like when someone was their own father.
// Not at all.

import { findAllPaths } from '../services/paths/findAllPaths';
import { getIndividual } from '../services/data/dataService';
import { Individual } from '../types/Individual';

// Mock data
const mockIndividuals: Record<string, Individual> = {
  A: {
    id: 'A',
    father_id: 'B',
    mother_id: 'C',
    birth_date: null,
    inbreeding: null,
    founder: null,
  },
  B: {
    id: 'B',
    father_id: 'D',
    mother_id: 'E',
    birth_date: null,
    inbreeding: null,
    founder: null,
  },
  C: {
    id: 'C',
    father_id: null,
    mother_id: 'F',
    birth_date: null,
    inbreeding: null,
    founder: null,
  },
  D: {
    id: 'D',
    father_id: null,
    mother_id: null,
    birth_date: null,
    inbreeding: 0,
    founder: 'Yes',
  },
  E: {
    id: 'E',
    father_id: null,
    mother_id: null,
    birth_date: null,
    inbreeding: 0,
    founder: 'Yes',
  },
  F: {
    id: 'F',
    father_id: null,
    mother_id: null,
    birth_date: null,
    inbreeding: 0,
    founder: 'Yes',
  },
  G: {
    id: 'G',
    father_id: 'A',
    mother_id: 'B',
    birth_date: null,
    inbreeding: null,
    founder: null,
  },
};

// Mock `getIndividual`
jest.mock('../services/data/dataService', () => ({
  getIndividual: jest.fn((id: string) =>
    Promise.resolve(mockIndividuals[id] || null)
  ),
}));

describe('findAllPaths', () => {
  test('Individual with no parents', async () => {
    const individual: Individual = {
      id: 'D',
      father_id: null,
      mother_id: null,
      birth_date: null,
      inbreeding: null,
      founder: 'Yes',
    };
    const familyTree = await findAllPaths(individual);
    expect(familyTree.paternal_paths).toEqual([]);
    expect(familyTree.maternal_paths).toEqual([]);
  });

  test('should handle an individual with one parent', async () => {
    const individual = mockIndividuals['C'];
    const expectedMaternalPaths: string[][] = [];
    const familyTree = await findAllPaths(individual);
    expect(familyTree.paternal_paths).toEqual([]);
    expect(familyTree.maternal_paths.map((path) => path.path)).toEqual(
      expectedMaternalPaths
    );
  });

  test('Individual with one parent', async () => {
    const individual: Individual = {
      id: 'X',
      father_id: 'Z',
      mother_id: null,
      birth_date: null,
      inbreeding: null,
      founder: null,
    };
    (getIndividual as jest.Mock).mockImplementation((id: string) =>
      Promise.resolve(mockIndividuals[id] || null)
    );
    const familyTree = await findAllPaths(individual);
    expect(familyTree.paternal_paths).toEqual([]);
    expect(familyTree.maternal_paths).toEqual([]);
  });

  test('Individual with parents who dont exist', async () => {
    const individual: Individual = {
      id: 'Y',
      father_id: 'Z',
      mother_id: 'W',
      birth_date: null,
      inbreeding: null,
      founder: null,
    };
    (getIndividual as jest.Mock).mockImplementation((id: string) =>
      Promise.resolve(mockIndividuals[id] || null)
    );
    const familyTree = await findAllPaths(individual);
    expect(familyTree.paternal_paths).toEqual([]);
    expect(familyTree.maternal_paths).toEqual([]);
  });
});
