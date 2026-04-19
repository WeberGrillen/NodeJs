import db from './connection.js';


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