// Nice and simple, nothing weird, abit verbose
import pool from '../../config/db';
import logger from '../../utils/logger';

/**
 * Assigns placeholder values (`UNKNOWN1`, `UNKNOWN2`, etc.) to `father_id`
 * for individuals with a missing `father_id` and a present `mother_id`.
 */
export const calculateUnknownFathers = async (): Promise<void> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Select individuals with missing father_id and a present mother_id
    const selectQuery = `
      SELECT id
      FROM individuals
      WHERE father_id IS NULL AND mother_id IS NOT NULL
      ORDER BY id;
    `;

    const { rows } = await client.query(selectQuery);

    // Update each individual's father_id with a unique placeholder
    let counter = 1;
    for (const { id } of rows) {
      const updateQuery = `
        UPDATE individuals
        SET father_id = $1
        WHERE id = $2;
      `;
      const unknownFather = `UNKNOWN${counter}`;
      await client.query(updateQuery, [unknownFather, id]);
      counter++;
    }

    await client.query('COMMIT');
    logger.info(`Updated father_id for ${rows.length} individuals.`);
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Error setting unknown fathers:', error);
    throw error;
  } finally {
    client.release();
  }
};
