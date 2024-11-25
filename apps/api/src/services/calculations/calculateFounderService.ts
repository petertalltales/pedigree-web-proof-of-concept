// Code to set "founder" to TRUE and "inbreeding" to 0 for individuals with no father or mother registration numbers.

import pool from '../../config/db';

/**
 * Service to set "founder" to TRUE and "inbreeding" to 0 for individuals
 * with no father or mother registration numbers.
 */
export const calculateFounders = async (): Promise<void> => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Update "founder" to TRUE and "inbreeding" to 0 where both "father_id" and "mother_id" are NULL
    const updateFounderQuery = `
    UPDATE individuals
    SET founder = 'Yes', inbreeding = 0
    WHERE father_id IS NULL AND mother_id IS NULL;
  `;

    const result = await client.query(updateFounderQuery);
    console.log(
      `Founder status and inbreeding coefficient updated successfully for ${result.rowCount} rows.`
    );

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(
      'Error setting founder status and inbreeding coefficient:',
      error
    );
    throw error;
  } finally {
    client.release();
  }
};
