const postgres = require('postgres');
require('dotenv').config();

const sql = postgres({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'benchmark_db',
  username: process.env.DB_USER || 'benchmark_user',
  password: process.env.DB_PASSWORD || 'benchmark_password',
});

async function connect_and_truncate() {
  // The postgres library automatically connects when needed, so we don't need to explicitly connect
  // We can add a ping to test the connection if desired
  await sql`TRUNCATE TABLE text_data RESTART IDENTITY CASCADE`
  await sql`TRUNCATE TABLE json_data RESTART IDENTITY CASCADE`
  await sql`TRUNCATE TABLE jsonb_data RESTART IDENTITY CASCADE`
}

async function disconnect() {
  await sql.end();
}

async function benchmarkInsert(table, data, count) {
  const startTime = process.hrtime();

  for (let i = 0; i < count; i++) {
    await sql`INSERT INTO ${sql(table)} (data) VALUES (${data})`;
  }

  const endTime = process.hrtime(startTime);
  return endTime[0] + endTime[1] / 1e9;
}

async function benchmarkInsertText(table, data, count) {
  const startTime = process.hrtime();

  for (let i = 0; i < count; i++) {
    await sql`INSERT INTO ${sql(table)} (data) VALUES (${JSON.stringify(data)})`;
  }

  const endTime = process.hrtime(startTime);
  return endTime[0] + endTime[1] / 1e9;
}

async function benchmarkUpdate(table, data, count) {
  const startTime = process.hrtime();

  for (let i = 1; i <= count; i++) {
    await sql`UPDATE ${sql(table)} SET data = ${data} WHERE id = ${i}`;
  }

  const endTime = process.hrtime(startTime);
  return endTime[0] + endTime[1] / 1e9;
}

async function benchmarkSelect(table, count) {
  const startTime = process.hrtime();

  for (let i = 1; i <= count; i++) {
    const r = await sql`SELECT * FROM ${sql(table)} WHERE id = ${i}`;
  }

  const endTime = process.hrtime(startTime);
  return endTime[0] + endTime[1] / 1e9;
}

async function benchmarkSelectText(table, count) {
  const startTime = process.hrtime();

  for (let i = 1; i <= count; i++) {
    const r = await sql`SELECT * FROM ${sql(table)} WHERE id = ${i}`;
    JSON.parse(r[0].data)
  }

  const endTime = process.hrtime(startTime);
  return endTime[0] + endTime[1] / 1e9;
}

module.exports = {
  connect_and_truncate,
  disconnect,
  benchmarkInsert,
  benchmarkInsertText,
  benchmarkUpdate,
  benchmarkSelect,
  benchmarkSelectText
};