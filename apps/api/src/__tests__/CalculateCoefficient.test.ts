// These tests were a lifesaver when building the functionality of the coefficient.
// Who needs to run your code when you can just run tests when developing?

import { calculateCoefficient } from '../services/calculations/calculateCoefficient'; // Adjust the import path as necessary
import { Individual, PathPair, ValidPaths } from '../types/Individual';
import { getIndividual } from '../services/data/dataService';
import { calculateInbreeding } from '../services/calculations/calculateInbreedingService';

// Mock the dataService and calculateInbreedingService modules
jest.mock('../services/data/dataService', () => ({
  getIndividual: jest.fn(),
}));

jest.mock('../services/calculations/calculateInbreedingService', () => ({
  calculateInbreeding: jest.fn(),
}));

const mockedGetIndividual = getIndividual as jest.MockedFunction<
  typeof getIndividual
>;
const mockedCalculateInbreeding = calculateInbreeding as jest.MockedFunction<
  typeof calculateInbreeding
>;

describe('calculateCoefficient - Single PathPair for Individual X', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should calculate inbreeding coefficient correctly for individual X with paternal_path: [A, D, G] and maternal_path: [B, H, G]', async () => {
    // Define the ValidPaths object
    const validPaths: PathPair[] = [
      {
        paternal_path: { path: ['A', 'D', 'G'] },
        maternal_path: { path: ['B', 'H', 'G'] },
      },
    ];

    const validPathsObject: ValidPaths = {
      individual: {
        id: 'X',
        father_id: 'A',
        mother_id: 'B',
        birth_date: null,
        inbreeding: null,
        founder: null,
      },
      valid_paths: validPaths,
    };

    // Mock getIndividual responses
    const individualG: Individual = {
      id: 'G',
      father_id: null,
      mother_id: null,
      birth_date: null,
      inbreeding: 0, // fA = 0
      founder: 'Yes',
    };

    mockedGetIndividual.mockImplementation(async (id: string) => {
      if (id === 'G') return individualG;
      return null;
    });

    // Calculate the expected contribution
    // contribution = 0.5^(6 - 1) * (1 + 0.00) = 0.03125
    const expectedInbreeding = 0.03125;

    const result = await calculateCoefficient(validPathsObject);

    expect(result).toBeCloseTo(expectedInbreeding);
    expect(mockedGetIndividual).toHaveBeenCalledWith('G');
    expect(mockedCalculateInbreeding).not.toHaveBeenCalled();
  });
});

describe('calculateCoefficient - PathPair with Ancestor fA > 0', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should calculate inbreeding coefficient correctly for individual X with fA = 0.05 from ancestor G', async () => {
    // Define the ValidPaths object
    const validPaths: PathPair[] = [
      {
        paternal_path: { path: ['A', 'D', 'G'] },
        maternal_path: { path: ['B', 'H', 'G'] },
      },
    ];

    const validPathsObject: ValidPaths = {
      individual: {
        id: 'X',
        father_id: 'A',
        mother_id: 'B',
        birth_date: null,
        inbreeding: null,
        founder: null,
      },
      valid_paths: validPaths,
    };

    // Mock getIndividual responses
    const individualG: Individual = {
      id: 'G',
      father_id: null,
      mother_id: null,
      birth_date: null,
      inbreeding: 0.05, // fA = 0.05
      founder: 'Yes',
    };

    mockedGetIndividual.mockImplementation(async (id: string) => {
      if (id === 'G') return individualG;
      return null;
    });

    // Calculate the expected contribution
    // n_p = 3, n_m = 3, n = 6
    // contribution = 0.5^(6 - 1) * (1 + 0.05) = 0.032812
    const expectedInbreeding = 0.032812;

    const result = await calculateCoefficient(validPathsObject);

    expect(result).toBeCloseTo(expectedInbreeding);
    expect(mockedGetIndividual).toHaveBeenCalledWith('G');
    expect(mockedCalculateInbreeding).not.toHaveBeenCalled();
  });
});

describe('calculateCoefficient - Multiple PathPairs for Individual X', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should calculate inbreeding coefficient correctly when both PathPairs are provided, summing their contributions', async () => {
    // Define the ValidPaths object with two PathPairs
    const validPaths: PathPair[] = [
      {
        paternal_path: { path: ['A', 'D', 'G'] },
        maternal_path: { path: ['B', 'H', 'G'] },
      },
      {
        paternal_path: { path: ['A', 'D', 'F'] },
        maternal_path: { path: ['B', 'H', 'F'] },
      },
    ];

    const validPathsObject: ValidPaths = {
      individual: {
        id: 'X',
        father_id: 'A',
        mother_id: 'B',
        birth_date: null,
        inbreeding: null,
        founder: null,
      },
      valid_paths: validPaths,
    };

    // Mock getIndividual responses
    const individualG: Individual = {
      id: 'G',
      father_id: null,
      mother_id: null,
      birth_date: null,
      inbreeding: 0, // fA = 0 for G
      founder: 'Yes',
    };

    const individualF: Individual = {
      id: 'F',
      father_id: null,
      mother_id: null,
      birth_date: null,
      inbreeding: 0.05, // fA = 0.05 for F
      founder: 'Yes',
    };

    mockedGetIndividual.mockImplementation(async (id: string) => {
      if (id === 'G') return individualG;
      if (id === 'F') return individualF;
      return null;
    });

    // Calculate the expected contributions
    // First PathPair:
    // n_p = 3, n_m = 3, n = 6
    // contribution1 = 0.5^(6 - 1) * (1 + 0) = 0.03125

    // Second PathPair:
    // n_p = 3, n_m = 3, n = 6
    // contribution2 = 0.5^(6 - 1) * (1 + 0.05) = 0.03125 * 1.05 = 0.0328125

    // Total Inbreeding Coefficient:
    // fX = 0.03125 + 0.0328125 = 0.0640625

    const expectedInbreeding = 0.0640625;

    const result = await calculateCoefficient(validPathsObject);

    expect(result).toBeCloseTo(expectedInbreeding);
    expect(mockedGetIndividual).toHaveBeenCalledWith('G');
    expect(mockedGetIndividual).toHaveBeenCalledWith('F');
    expect(mockedCalculateInbreeding).not.toHaveBeenCalled();
    expect(mockedGetIndividual).toHaveBeenCalledTimes(2);
  });
});
