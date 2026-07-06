const pool = require("./pool");

async function getAllAnime() {
  const { rows } = await pool.query("SELECT * FROM anime");
  return rows;
}

async function getAllGenres() {
  const { rows } = await pool.query("SELECT * FROM genre");
  return rows;
}

module.exports = {
  getAllAnime,
  getAllGenres,
};
