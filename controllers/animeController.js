const db = require("../db/queries");

//display all anime items
async function showAllAnimeGet(req, res) {
  const allAnime = await db.getAllAnime();
  res.render("animeList", { title: "List of Anime", allAnime: allAnime });
}

module.exports = { showAllAnimeGet };
