const pool = require("./pool");

async function getAllAnime() {
  const { rows } = await pool.query("SELECT * FROM anime ORDER BY id");
  return rows;
}

async function getAllGenres() {
  const { rows } = await pool.query("SELECT * FROM genre ORDER BY id");
  return rows;
}

async function getAllAnimeGenres() {
  const { rows } = await pool.query(
    "SELECT anime_id,genre_id,title,name FROM anime AS a LEFT JOIN anime_genre ON a.id = anime_id LEFT JOIN genre as b ON b.id = genre_id ORDER BY anime_id, genre_id;",
  );
  //return a table with a column showing anime id and the other the corresponding genre/ genres
  return rows;
}

async function getAnimeInfo(animeId) {
  const { rows } = await pool.query(
    "SELECT anime_id, genre_id, title, views, name FROM anime AS a LEFT JOIN anime_genre ON a.id = anime_id LEFT JOIN genre as b ON b.id = genre_id WHERE anime_id = ($1) ORDER BY anime_id;",
    [animeId],
  );
  return rows;
}

async function updateAnimeInfo(animeTitle, animeViews, animeGenres, animeId) {
  await pool.query(
    "UPDATE anime SET title = ($1), views = ($2) WHERE id = ($3)",
    [animeTitle, animeViews, animeId],
  );
  await pool.query("DELETE FROM anime_genre WHERE anime_id = ($1)", [animeId]);
  const animeGenresArr = Array.isArray(animeGenres)
    ? animeGenres
    : [animeGenres];
  for (const genreId of animeGenresArr) {
    await pool.query(
      "INSERT INTO anime_genre (anime_id, genre_id) VALUES ($1,$2)",
      [animeId, genreId],
    );
  }
}

async function addAnime(animeTitle, animeViews, animeGenres) {
  const newAnimeIdResult = await pool.query(
    "INSERT INTO anime (title, views) VALUES ($1,$2) RETURNING id",
    [animeTitle, animeViews],
  );
  const newAnimeId = newAnimeIdResult.rows[0].id;
  const animeGenresArr = Array.isArray(animeGenres)
    ? animeGenres
    : [animeGenres];
  for (const genreId of animeGenresArr) {
    await pool.query(
      "INSERT INTO anime_genre (anime_id, genre_id) VALUES ($1,$2)",
      [newAnimeId, genreId],
    );
  }
}

async function getAnimeByGenre(genreId) {
  const { rows } = await pool.query(
    "SELECT anime_id, genre_id, title, name FROM anime AS a LEFT JOIN anime_genre ON a.id = anime_id LEFT JOIN genre as b ON b.id = genre_id WHERE genre_id = ($1) ORDER BY anime_id;",
    [genreId],
  );
  return rows;
}

async function addGenre(genreName) {
  await pool.query("INSERT INTO genre (name) VALUES ($1)", [genreName]);
}

async function deleteGenre(genreId) {
  await pool.query("DELETE FROM genre WHERE id = ($1)", [genreId]);
}

module.exports = {
  getAllAnime,
  getAllGenres,
  getAllAnimeGenres,
  getAnimeInfo,
  updateAnimeInfo,
  addAnime,
  getAnimeByGenre,
  addGenre,
  deleteGenre,
};
