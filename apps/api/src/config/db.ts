// apps/api/src/config/db.ts

import pg from 'pg';
import logger from '../utils/logger';

const pool = new pg.Pool({
  user: 'pedigre_admin',
  host: 'pedigree-db.c7c0qaoqws40.eu-central-1.rds.amazonaws.com',
  database: 'postgres',
  password: 'kindra666',
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // Disables certificate validation
  },
});

// Handle unexpected errors on idle PostgreSQL clients
pool.on('error', (err: Error) => {
  logger.error('Unexpected error on idle PostgreSQL client:', err);
});

export default pool;
