// I started implementing shared types in a lib between frontend and backend, that will save _alot_ of code and standardize the data structures

import pool from '../../config/db';
import logger from '../../utils/logger';
import { Individual } from '../../types/Individual';

/**
 * Clears the `individuals` table in the database.
 * Rolls back on error and logs the issue.
 * @throws Error if the database operation fails.
 */
export const clearData = async (): Promise<void> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query('DELETE FROM individuals');
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Error clearing the `individuals` table:', error);
    throw error;
  } finally {
    client.release();
  }
};

/**
 * Fetches all records from the `individuals` table, ordered by ID.
 * @returns An array of individual records.
 * @throws Error if the database operation fails.
 */
export const fetchData = async (): Promise<Individual[]> => {
  try {
    const result = await pool.query<Individual>(
      'SELECT * FROM individuals ORDER BY id'
    );
    return result.rows;
  } catch (error) {
    logger.error('Error fetching data from the `individuals` table:', error);
    throw error;
  }
};

/**
 * Inserts or updates individual records in the `individuals` table.
 * Uses UPSERT to handle conflicts based on the primary key.
 * @param individuals - Array of Individual objects to insert or update.
 * @throws Error if the database operation fails.
 */
export const insertData = async (individuals: Individual[]): Promise<void> => {
  if (individuals.length === 0) return; // No data to insert

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const columns = Object.keys(individuals[0]).join(', '); // Column names for the query
    const values = individuals.map((ind) =>
      Object.values(ind).map((val) =>
        val === ''
          ? null
          : val instanceof Date
          ? val.toISOString().split('T')[0]
          : val
      )
    );

    const valuePlaceholders = values
      .map(
        (_, i) =>
          `(${Array(values[0].length)
            .fill(null)
            .map((_, j) => `$${i * values[0].length + j + 1}`)
            .join(', ')})`
      )
      .join(', ');

    const updateSet = Object.keys(individuals[0])
      .map((col) => `${col} = EXCLUDED.${col}`)
      .join(', ');

    const query = `
      INSERT INTO individuals (${columns})
      VALUES ${valuePlaceholders}
      ON CONFLICT (id) DO UPDATE SET ${updateSet};
    `;

    await client.query(query, values.flat());
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error(
      'Error inserting or updating records in the `individuals` table:',
      error
    );
    throw error;
  } finally {
    client.release();
  }
};

/**
 * Retrieves a single individual by their ID.
 * @param id - The ID of the individual.
 * @returns The Individual object if found, otherwise null.
 * @throws Error if the database operation fails.
 */
export const getIndividual = async (id: string): Promise<Individual | null> => {
  try {
    const query = `
      SELECT id, father_id, mother_id, birth_date, inbreeding, founder
      FROM individuals
      WHERE id = $1;
    `;
    const { rows } = await pool.query<Individual>(query, [id]);

    if (rows.length === 0) {
      logger.info(`Individual with ID ${id} not found.`);
      return null;
    }

    return rows[0];
  } catch (error) {
    logger.error(`Error retrieving individual with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Updates the inbreeding coefficient for a specific individual.
 * @param id - The ID of the individual.
 * @param inbreeding - The calculated inbreeding coefficient.
 * @throws Error if the update fails.
 */
export const updateInbreedingCoefficient = async (
  id: string,
  inbreeding: number
): Promise<void> => {
  try {
    const updateQuery = `
      UPDATE individuals
      SET inbreeding = $1
      WHERE id = $2;
    `;
    await pool.query(updateQuery, [inbreeding, id]);
  } catch (error) {
    logger.error(
      `Error updating inbreeding coefficient for individual ID ${id}:`,
      error
    );
    throw error;
  }
};
