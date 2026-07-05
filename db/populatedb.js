const { Client } = require("pg");

const createAnimeTable = `CREATE TABLE IF NOT EXISTS anime (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
title VARCHAR(255) NOT NULL,
views INTEGER
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

const populateTables = `INSERT INTO anime (title, views) VALUES 
('Fullmetal Alchemist: Brotherhood', 2),
('Sword Art Online', 3),
('Steins;Gate', 1);

INSERT INTO genre (name) VALUES 
('Adventure'),
('Action'),
('Fantasy'),
('Sci-Fi');

INSERT INTO anime_genre (anime_id, genre_id) VALUES
(1, 1),
(1, 2),
(2, 2),
(2, 3),
(3, 4);
`;

async function main() {
  console.log("Database seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`,
  });
  await client.connect();
  await client.query(createAnimeTable);
  await client.query(createGenreTable);
  await client.query(createAnimeGenreTable);
  await client.query(populateTables);
  await client.end();
  console.log("Database initialised.");
}

main();
