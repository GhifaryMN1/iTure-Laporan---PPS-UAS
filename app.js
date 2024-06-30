const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 8080
const pg = require("pg");
const { Pool } = pg;
var cors = require('cors')

app.use(cors())

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: "5432",
  database: "pps",
  password: "12345",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// pool database
pool.connect((err) => {
    if (err) throw err;
    console.log('PostgreSQL Connected...');
});

app.use(bodyParser.json());

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})

 
  // POST method route
  app.post('/', (req, res) => {
    res.send('POST request to the homepage')
  })

// POST method route to create a new activity
app.post('/activities', async (req, res) => {
  const { program_id, pic, remark, status, created_by, updated_by } = req.body;
  try {
      const result = await pool.query(
          `INSERT INTO activity (program_id, pic, remark, status, created_by, updated_by)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING *`,
          [program_id, pic, remark, status || 'CREATED', created_by, updated_by]
      );
      res.json(result.rows[0]);
  } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
  }
});

// GET method route to retrieve all activities
app.get('/activities', async (req, res) => {
  console.log("masuk")
  try {
      const result = await pool.query('SELECT * FROM activity');
      res.json(result.rows);
  } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
  }
});

// GET method route to get an activity by ID
app.get('/activities/:id', async (req, res) => {
  const id = req.params.id;
  console.log("masuk lagi")
  try {
    const result = await pool.query('SELECT * FROM activity WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Activity not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

  app.listen(port, () => {
    console.log(`Service listening on port ${port}`)
  })

  
  