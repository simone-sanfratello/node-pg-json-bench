const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'benchmark_db',
  user: process.env.DB_USER || 'benchmark_user',
  password: process.env.DB_PASSWORD || 'benchmark_password',
});

async function setup() {
  try {
    await client.connect();

    // Create tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS text_data (
        id SERIAL PRIMARY KEY,
        data TEXT
      );

      CREATE TABLE IF NOT EXISTS json_data (
        id SERIAL PRIMARY KEY,
        data JSON
      );

      CREATE TABLE IF NOT EXISTS jsonb_data (
        id SERIAL PRIMARY KEY,
        data JSONB
      );
    `);

    console.log('Tables created successfully');
  } catch (err) {
    console.error('Error setting up database:', err);
  } finally {
    await client.end();
  }
}

setup();