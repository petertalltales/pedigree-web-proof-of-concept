// Some consts here that can be turned into settings in the UI
// Implementing a query-handler would reduce the amount of code in the controller

import pool from '../../config/db';
import logger from '../../utils/logger';

/** Configurable Constants */
const ASSUMED_LIFESPAN_YEARS = 14; // Minimum lifespan assumption in years
const BIRTH_DATE_OFFSET_YEARS = 2; // Offset to calculate parent birth date from offspring
const DECEASED_PRESUMED_YES = 'Presumed yes'; // Deceased presumed yes status
const DECEASED_PRESUMED_NO = 'Presumed no'; // Deceased presumed no status
const DECEASED_YES = 'Yes'; // Explicit deceased status

/**
 * Estimates missing birth dates based on the earliest offspring's birth date minus 2 years.
 */
export const calculateBirthDates = async (): Promise<void> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const updateBirthDateQuery = `
      UPDATE individuals
      SET birth_date = (
        SELECT MIN(offspring.birth_date) - INTERVAL '${BIRTH_DATE_OFFSET_YEARS} years'
        FROM individuals AS offspring
        WHERE offspring.father_id = individuals.id OR offspring.mother_id = individuals.id
      )
      WHERE birth_date IS NULL;
    `;
    // Calculate `birth_date` for individuals with NULL `birth_date`:
    // It sets the birth date to the earliest birth date of their offspring minus the offset years.

    await client.query(updateBirthDateQuery);

    await client.query('COMMIT');
    logger.info('Birth dates estimated successfully.');
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Error estimating birth dates:', error);
    throw error;
  } finally {
    client.release();
  }
};

/**
 * Estimates missing death dates and updates deceased status based on specific cases.
 */
export const calculateDeathDates = async (): Promise<void> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Case 1: Deceased = Yes, No offspring
    const case1Query = `
      UPDATE individuals
      SET death_date = LEAST(
        birth_date + INTERVAL '${ASSUMED_LIFESPAN_YEARS} years',
        CURRENT_DATE
      )
      WHERE deceased = '${DECEASED_YES}'
        AND NOT EXISTS (
          SELECT 1
          FROM individuals offspring
          WHERE offspring.father_id = individuals.id OR offspring.mother_id = individuals.id
        );
    `;
    await client.query(case1Query);

    // Case 2: Deceased = Yes, With offspring
    const case2Query = `
      UPDATE individuals
      SET death_date = LEAST(
        GREATEST(
          (SELECT MAX(offspring.birth_date)
           FROM individuals offspring
           WHERE offspring.father_id = individuals.id OR offspring.mother_id = individuals.id),
          birth_date + INTERVAL '${ASSUMED_LIFESPAN_YEARS} years'
        ),
        CURRENT_DATE
      )
      WHERE deceased = '${DECEASED_YES}'
        AND EXISTS (
          SELECT 1
          FROM individuals offspring
          WHERE offspring.father_id = individuals.id OR offspring.mother_id = individuals.id
        );
    `;
    await client.query(case2Query);

    // Case 3: Deceased = NULL, No offspring
    const case3Query = `
      UPDATE individuals
      SET death_date = birth_date + INTERVAL '${ASSUMED_LIFESPAN_YEARS} years',
          deceased = CASE
            WHEN birth_date + INTERVAL '${ASSUMED_LIFESPAN_YEARS} years' > CURRENT_DATE THEN '${DECEASED_PRESUMED_NO}'
            ELSE '${DECEASED_PRESUMED_YES}'
          END
      WHERE deceased IS NULL
        AND NOT EXISTS (
          SELECT 1
          FROM individuals offspring
          WHERE offspring.father_id = individuals.id OR offspring.mother_id = individuals.id
        );
    `;
    await client.query(case3Query);

    // Case 4: Deceased = NULL, With offspring
    const case4Query = `
      UPDATE individuals
      SET death_date = GREATEST(
          (SELECT MAX(offspring.birth_date)
           FROM individuals offspring
           WHERE offspring.father_id = individuals.id OR offspring.mother_id = individuals.id),
          birth_date + INTERVAL '${ASSUMED_LIFESPAN_YEARS} years'
      ),
          deceased = CASE
            WHEN GREATEST(
              (SELECT MAX(offspring.birth_date)
               FROM individuals offspring
               WHERE offspring.father_id = individuals.id OR offspring.mother_id = individuals.id),
              birth_date + INTERVAL '${ASSUMED_LIFESPAN_YEARS} years'
            ) > CURRENT_DATE THEN '${DECEASED_PRESUMED_NO}'
            ELSE '${DECEASED_PRESUMED_YES}'
          END
      WHERE deceased IS NULL
        AND EXISTS (
          SELECT 1
          FROM individuals offspring
          WHERE offspring.father_id = individuals.id OR offspring.mother_id = individuals.id
        );
    `;
    await client.query(case4Query);

    await client.query('COMMIT');
    logger.info('Death dates and deceased statuses estimated successfully.');
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Error estimating death dates:', error);
    throw error;
  } finally {
    client.release();
  }
};
