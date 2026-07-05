const pool = require("./pool");

async function getAllAnime() {
  const { rows } = await pool.query("SELECT * FROM anime");
  return rows;
}

module.exports = {
  getAllAnime,
};
