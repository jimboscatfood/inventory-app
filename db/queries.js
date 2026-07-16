const pool = require("./pool");

async function getAllAnime() {
  const { rows } = await pool.query("SELECT * FROM anime");
  return rows;
}

async function getAllGenres() {
  const { rows } = await pool.query("SELECT * FROM genre");
  return rows;
}

async function getAllAnimeGenres() {
  const { rows } = await pool.query(
    "SELECT anime_id,genre_id,title,name FROM anime AS a LEFT JOIN anime_genre ON a.id = anime_id LEFT JOIN genre as b ON b.id = genre_id;",
  );
  //return a table with a column showing anime id and the other the corresponding genre/ genres
  return rows;
}

async function getAnimeInfo(animeId) {
  const { rows } = await pool.query(
    "SELECT anime_id, genre_id, title, views, name FROM anime AS a LEFT JOIN anime_genre ON a.id = anime_id LEFT JOIN genre as b ON b.id = genre_id WHERE anime_id = ($1)",
    [animeId],
  );
  return rows;
}

module.exports = {
  getAllAnime,
  getAllGenres,
  getAllAnimeGenres,
  getAnimeInfo,
};
