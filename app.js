const pg = require('pg-promise')();

const conn = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '',
  database: 'learning-postgres'
};

const db = pg(conn);

const insertDB = async (name, species) => {
  try {
    await db.none("DELETE FROM pets WHERE name='Cathy';");
    await db.none('INSERT INTO pets (name, species) VALUES ($1, $2);', [
      name,
      species
    ]);
    const result = await db.any("UPDATE pets SET name='cutie' WHERE id=9;");
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

const main = async () => {
  try {
    const result = await db.any('SELECT * FROM pets;');
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

insertDB('Cathy', 'cat');
main();
