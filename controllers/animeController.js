const db = require("../db/queries");

//display all anime items
async function showAllAnimeGet(req, res) {
  const allAnime = await db.getAllAnime();
  const allAnimeGenres = await db.getAllAnimeGenres();
  res.render("animeList", {
    title: "List of Anime",
    allAnime: allAnime,
    allAnimeGenres: allAnimeGenres,
  });
}

//show details of an anime item, with edit option
async function animeInfoGet(req, res) {
  const animeInfo = await db.getAnimeInfo(req.params.animeId);
  res.render("viewAnime", {
    animeInfo: animeInfo,
  });
}

module.exports = { showAllAnimeGet, animeInfoGet };
