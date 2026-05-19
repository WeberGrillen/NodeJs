import 'dotenv/config';
import { hashPassword } from '../utils/passwordHashing.js';
import pool from './connection.js';


if (!process.env.ADMIN_PASSWORD) {
    throw new Error('ADMIN_PASSWORD is not set in .env');
}

const ADMIN_PASSWORD = await hashPassword(process.env.ADMIN_PASSWORD);
const deleteMode = process.argv.includes('--delete');

if (deleteMode) {
    await pool.query(`DROP TABLE IF EXISTS users CASCADE`);
}

await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL
    );
`);

await pool.query(
    `INSERT INTO users (name, email, password) 
     VALUES ($1, $2, $3)
     ON CONFLICT (email) DO NOTHING`,
    ['admin', 'admin@admin.com', ADMIN_PASSWORD]
);

await pool.end();