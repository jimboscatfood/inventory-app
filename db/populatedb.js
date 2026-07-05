const { Client } = require("pg");

const createAnimeTable = `CREATE TABLE IF NOT EXISTS anime (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
title VARCHAR(255) NOT NULL,
times_watched INTEGER
)`;

const createGenreTable = `CREATE TABLE IF NOT EXISTS genre (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR(50) NOT NULL UNIQUE
)`;

const createAnimeGenreTable = `CREATE TABLE IF NOT EXISTS anime_genre (
anime_id INTEGER,
genre_id INTEGER,
PRIMARY KEY (anime_id, genre_id),
FOREIGN KEY (anime_id) REFERENCES anime(id) ON DELETE CASCADE,
FOREIGN KEY (genre_id) REFERENCES genre(id) ON DELETE CASCADE
)`;

async function main() {
  console.log("Database seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`,
  });
  await client.connect();
  await client.query(createAnimeTable);
  await client.query(createGenreTable);
  await client.query(createAnimeGenreTable);
  await client.end();
  console.log("Database initialised.");
}

main();
