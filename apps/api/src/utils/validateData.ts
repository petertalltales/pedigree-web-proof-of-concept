// Quick and dirty validator, can be improved upon greatly

import { Individual } from '../types/Individual';

/**
 * Validates an array of Individual objects to ensure all required fields are present.
 * Specifically checks for the presence of the `id` field.
 *
 * @param individuals - Array of Individual objects to validate.
 * @throws Error if validation fails for any record.
 */
export const validateData = (individuals: Individual[]): void => {
  if (individuals.length === 0) {
    throw new Error('Validation Error: No data provided for validation.');
  }

  individuals.forEach((individual, index) => {
    if (!individual.id) {
      throw new Error(
        `Validation Error: Missing "id" field in record at index ${index}.`
      );
    }
  });
};
