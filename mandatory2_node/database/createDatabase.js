import 'dotenv/config';
import { hashPassword } from '../utils/passwordHashing.js';
import db from './connection.js';


if (!process.env.ADMIN_PASSWORD) {
    throw new Error('ADMIN_PASSWORD is not set in .env');
}
const ADMIN_PASSWORD = await hashPassword(process.env.ADMIN_PASSWORD);


const deleteMode = process.argv.includes('--delete');

if (deleteMode) {
    await db.exec(`DROP TABLE IF EXISTS users`);
}

await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(50) NOT NULL UNIQUE,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        password VARCHAR(100) NOT NULL
    );
`);

if (deleteMode) {
    await db.run(
        'INSERT INTO users (username, email, first_name, last_name, password) VALUES (?, ?, ?, ?, ?)',
        ['admin', 'admin@admin.com', 'Admin', 'Admin', ADMIN_PASSWORD]
    );
;}