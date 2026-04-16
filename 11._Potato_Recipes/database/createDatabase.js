import db from './connection.js';


// (argument) => argument ==='--delete')

const deleteMode = process.argv.includes('--delete');

if (deleteMode) {
    await db.exec(`DROP TABLE IF EXISTS ingredients`);
    await db.exec(`DROP TABLE IF EXISTS recipes`);
}
/* 
    .exec() // Run DCL / DDL (with no parameters)
    .run() // Run a query without returning data (INSERT, UPDATE, DELETE)
    .all()  // Run a query and retrieve the result set (SELECT)
*/



/* Conventions for SQL Tables
    1. snake case 
    2. plural for tables
    3. use lowercase for tables
*/

// DDL

await db.exec(`
    CREATE TABLE IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipe_name VARCHAR(100) NOT NULL,
        description TEXT,
        minutes_to_cook INTEGER
    );

    CREATE TABLE IF NOT EXISTS ingredients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipe_id INTEGER,
        ingredient_name TEXT NOT NULL,
        units INTEGER,
        unit_of_measurement TEXT CHECK( unit_of_measurement IN ("l", "kg", "unit") ),
        FOREIGN KEY (recipe_id) REFERENCES recipes (id)
    );
`);

// DML
// seeding
if (deleteMode) {
    await db.run(`INSERT INTO recipes (recipe_name) VALUES ('Potate Pancakes');`);
    await db.run(`INSERT INTO RECIPES VALUES ('2', 'Bakes Potato', "Also known as a jacket potato. It's a treat in the winter months.", 12);`);
    await db.run(`INSERT INTO ingredients (recipe_id, ingredient_name, units, unit_of_measurement) VALUES (1, 'flour', '0.06', 'kg')`);
    await db.run(`INSERT INTO ingredients (recipe_id, ingredient_name, units, unit_of_measurement) VALUES (2, 'bacon', '1', 'kg')`);
};


