import pool from '../../config/db';
import { Individual } from '../../types/pedigreeTypes';

/**
 * Clears the `individuals` table in the database.
 * Rolls back on error.
 * @throws Error if the database operation fails.
 */
export const clearData = async (): Promise<void> => {
  const client = await pool.connect();
  await client.query('BEGIN');
  try {
    await client.query('DELETE FROM individuals');
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
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
  const result = await pool.query<Individual>(
    'SELECT * FROM individuals ORDER BY birth_date DESC'
  );
  return result.rows;
};

/**
 * Inserts or updates individual records in the `individuals` table.
 * Uses UPSERT to handle conflicts based on the primary key.
 * @param individuals - Array of Individual objects to insert or update.
 * @throws Error if the database operation fails.
 */
export const insertData = async (individuals: Individual[]): Promise<void> => {
  if (individuals.length === 0) return;

  const client = await pool.connect();
  await client.query('BEGIN');
  try {
    const columns = Object.keys(individuals[0]).join(', ');
    const values = individuals.map((ind) =>
      Object.values(ind).map((val) =>
        val === ''
          ? null
          : val instanceof Date
          ? val.toISOString().split('T')[0]
          : val
      )
    );

    const preparedValues = values.map((indValues) => {
      const inbreedingIndex = Object.keys(individuals[0]).indexOf('inbreeding');
      if (inbreedingIndex !== -1 && indValues[inbreedingIndex] === undefined) {
        indValues[inbreedingIndex] = null;
      }
      return indValues;
    });

    const valuePlaceholders = preparedValues
      .map(
        (_, i) =>
          `(${Array(preparedValues[0].length)
            .fill(null)
            .map((_, j) => `$${i * preparedValues[0].length + j + 1}`)
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

    await client.query(query, preparedValues.flat());
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

/**
 * Retrieves a single individual by their ID.
 * @param id - The ID of the individual.
 * @returns The Individual object if found, otherwise null.
 */
export const getIndividual = async (id: string): Promise<Individual | null> => {
  const query = `
    SELECT id, father_id, mother_id, birth_date, inbreeding, founder
    FROM individuals
    WHERE id = $1;
  `;
  const { rows } = await pool.query<Individual>(query, [id]);

  return rows.length === 0 ? null : rows[0];
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
  const updateQuery = `
    UPDATE individuals
    SET inbreeding = $1
    WHERE id = $2;
  `;
  await pool.query(updateQuery, [inbreeding, id]);
};

/**
 * Performs a bulk update of inbreeding coefficients for all individuals in a Pedigree map.
 * @param pedigree - A Pedigree map where each value is an Individual.
 * @throws Error if the bulk update fails.
 */
export const updateInbreedingBulk = async (
  pedigree: Map<string, Individual>
): Promise<void> => {
  const updates = Array.from(pedigree.values())
    .filter(
      (individual) =>
        individual.inbreeding !== null && individual.inbreeding !== undefined
    )
    .map((individual) => ({
      id: individual.id,
      inbreeding: Number(individual.inbreeding) || 0,
    }));

  if (updates.length === 0) return;

  const client = await pool.connect();
  await client.query('BEGIN');
  try {
    const valueStrings = updates
      .map((_, idx) => `($${idx * 2 + 1}, $${idx * 2 + 2})`)
      .join(', ');
    const values = updates.flatMap((u) => [u.id, u.inbreeding]);

    const query = `
      UPDATE individuals AS i
      SET inbreeding = data.inbreeding::numeric
      FROM (VALUES ${valueStrings}) AS data(id, inbreeding)
      WHERE i.id = data.id;
    `;

    await client.query(query, values);
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};
