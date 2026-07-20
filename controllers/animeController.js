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

async function animeUpdateGet(req, res) {
  const animeInfo = await db.getAnimeInfo(req.params.animeId);
  const allGenres = await db.getAllGenres();
  const allAnimeGenres = allGenres.map((genre) => genre.name);
  const animeTitle = animeInfo[0].title;
  const animeId = animeInfo[0].anime_id;
  const animeGenres = animeInfo.map((info) => info.name);
  const animeViews = animeInfo[0].views;
  res.render("updateAnime", {
    animeTitle: animeTitle,
    animeGenres: animeGenres,
    animeViews: animeViews,
    animeId: animeId,
    allGenres: allGenres,
  });
}

module.exports = { showAllAnimeGet, animeInfoGet, animeUpdateGet };
