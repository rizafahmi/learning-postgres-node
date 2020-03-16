const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg-promise')();

const conn = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '',
  database: 'learning-postgres'
};

const db = pg(conn);

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'Success' });
});

// require('./routes/pet.routes.js')(app);

app.get('/owners', async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    const pets = await db.query(`SELECT * FROM owners WHERE id=${id}`);
    console.log(pets);
    res.json(pets);
  } catch (err) {
    res.json({ err: err });
  }
});

app.listen(3002, () => console.log('Running...'));
