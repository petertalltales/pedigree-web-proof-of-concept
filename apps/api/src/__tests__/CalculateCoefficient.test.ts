// __tests__/calculateCoefficient.test.ts

import {
  calculateCoefficient,
  calculatePairContribution,
} from '../services/calculations/calculateCoefficient';
import { ValidPaths, PathPair, Individual } from '../types/pedigreeTypes';

describe('calculatePairContribution', () => {
  it('should correctly calculate contribution with valid generations and common_ancestor_inbreeding', () => {
    const pair: PathPair = {
      paternal_path: { path: ['P1', 'G1'] }, // Mocked paths with string arrays
      maternal_path: { path: ['M1', 'G1'] },
      generations: 3,
      common_ancestor: 'A1',
      common_ancestor_inbreeding: 0.5,
    };

    const expectedContribution = Math.pow(0.5, 3) * (1 + 0.5); // 0.125 * 1.5 = 0.1875
    expect(calculatePairContribution(pair)).toBeCloseTo(expectedContribution);
  });

  it('should correctly calculate contribution when generations is 1', () => {
    const pair: PathPair = {
      paternal_path: { path: ['P2'] },
      maternal_path: { path: ['M2'] },
      generations: 1,
      common_ancestor: 'A2',
      common_ancestor_inbreeding: 0.2,
    };

    const expectedContribution = Math.pow(0.5, 1) * (1 + 0.2); // 0.5 * 1.2 = 0.6
    expect(calculatePairContribution(pair)).toBeCloseTo(expectedContribution);
  });

  it('should throw an error when common_ancestor_inbreeding is null', () => {
    const pair: PathPair = {
      paternal_path: { path: ['P3', 'G2'] },
      maternal_path: { path: ['M3', 'G2'] },
      generations: 2,
      common_ancestor: 'A3',
      common_ancestor_inbreeding: null,
    };

    expect(() => calculatePairContribution(pair)).toThrowError(
      'Common ancestor inbreeding value is not set.'
    );
  });

  it('should throw an error when common_ancestor_inbreeding is undefined', () => {
    const pair: PathPair = {
      paternal_path: { path: ['P4', 'G3'] },
      maternal_path: { path: ['M4', 'G3'] },
      generations: 2,
      common_ancestor: 'A4',
      // common_ancestor_inbreeding is undefined
    } as PathPair; // Type assertion to bypass TypeScript checks for testing

    expect(() => calculatePairContribution(pair)).toThrowError(
      'Common ancestor inbreeding value is not set.'
    );
  });
});

describe('calculateCoefficient', () => {
  it('should correctly calculate the inbreeding coefficient with multiple valid PathPairs', () => {
    const individual: Individual = {
      id: 'I1',
      inbreeding: null,
      // Other fields can be mocked as necessary
    };

    const validPaths: ValidPaths = {
      individual,
      valid_paths: [
        {
          paternal_path: { path: ['P1', 'G1'] },
          maternal_path: { path: ['M1', 'G1'] },
          generations: 2,
          common_ancestor: 'A1',
          common_ancestor_inbreeding: 0.5,
        },
        {
          paternal_path: { path: ['P2', 'G2', 'G1'] },
          maternal_path: { path: ['M2', 'G2', 'G1'] },
          generations: 3,
          common_ancestor: 'A2',
          common_ancestor_inbreeding: 0.25,
        },
      ],
    };

    const expectedfX = parseFloat((0.375 + 0.15625).toFixed(10));
    expect(calculateCoefficient(validPaths)).toBeCloseTo(expectedfX);
  });

  it('should return 0 when valid_paths is empty', () => {
    const individual: Individual = {
      id: 'I2',
      inbreeding: null,
    };

    const validPaths: ValidPaths = {
      individual,
      valid_paths: [],
    };

    expect(calculateCoefficient(validPaths)).toBe(0);
  });

  it('should throw an error if any PathPair has missing common_ancestor_inbreeding', () => {
    const individual: Individual = {
      id: 'I3',
      inbreeding: null,
    };

    const validPaths: ValidPaths = {
      individual,
      valid_paths: [
        {
          paternal_path: { path: ['P3', 'G3'] },
          maternal_path: { path: ['M3', 'G3'] },
          generations: 2,
          common_ancestor: 'A3',
          common_ancestor_inbreeding: 0.5,
        },
        {
          paternal_path: { path: ['P4', 'G4', 'G2'] },
          maternal_path: { path: ['M4', 'G4', 'G2'] },
          generations: 3,
          common_ancestor: 'A4',
          common_ancestor_inbreeding: null,
        },
      ],
    };

    expect(() => calculateCoefficient(validPaths)).toThrowError(
      'Common ancestor inbreeding value is not set.'
    );
  });

  it('should throw an error when PathPair has undefined common_ancestor_inbreeding', () => {
    const individual: Individual = {
      id: 'I4',
      inbreeding: null,
    };

    const validPaths: ValidPaths = {
      individual,
      valid_paths: [
        {
          paternal_path: { path: ['P5', 'G5'] },
          maternal_path: { path: ['M5', 'G5'] },
          generations: 2,
          common_ancestor: 'A5',
          common_ancestor_inbreeding: 0.5,
        },
        {
          paternal_path: { path: ['P6', 'G6', 'G3'] },
          maternal_path: { path: ['M6', 'G6', 'G3'] },
          generations: 3,
          common_ancestor: 'A6',
          // common_ancestor_inbreeding is undefined
        } as PathPair,
      ],
    };

    expect(() => calculateCoefficient(validPaths)).toThrowError(
      'Common ancestor inbreeding value is not set.'
    );
  });

  it('should correctly calculate fX when all PathPairs have valid common_ancestor_inbreeding', () => {
    const individual: Individual = {
      id: 'I5',
      inbreeding: null,
    };

    const validPaths: ValidPaths = {
      individual,
      valid_paths: [
        {
          paternal_path: { path: ['P7', 'G7', 'G4'] },
          maternal_path: { path: ['M7', 'G7', 'G4'] },
          generations: 4,
          common_ancestor: 'A7',
          common_ancestor_inbreeding: 0.1,
        },
        {
          paternal_path: { path: ['P8', 'G8', 'G5', 'G4'] },
          maternal_path: { path: ['M8', 'G8', 'G5', 'G4'] },
          generations: 5,
          common_ancestor: 'A8',
          common_ancestor_inbreeding: 0.2,
        },
      ],
    };

    const expectedfX = parseFloat((0.06875 + 0.0375).toFixed(10)); // 0.10625
    expect(calculateCoefficient(validPaths)).toBeCloseTo(expectedfX);
  });
});
