import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg; // manages multiple connections at the same time

if (!process.env.DATABASE_URL) {
    throw new Error(' DATABASE_URL is not set in .env');
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

export default pool;