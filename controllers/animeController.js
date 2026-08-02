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
  const animeTitle = animeInfo[0].title;
  const animeId = animeInfo[0].anime_id;
  const animeGenres = animeInfo.map((info) => ({
    genre_id: info.genre_id,
    name: info.name,
  }));
  const animeViews = animeInfo[0].views;
  res.render("viewAnime", {
    animeTitle: animeTitle,
    animeGenres: animeGenres,
    animeViews: animeViews,
    animeId: animeId,
  });
}

async function animeUpdateGet(req, res) {
  const animeInfo = await db.getAnimeInfo(req.params.animeId);
  const allGenres = await db.getAllGenres();
  const animeTitle = animeInfo[0].title;
  const animeId = animeInfo[0].anime_id;
  const animeGenresId = animeInfo.map((info) => info.genre_id);
  const animeViews = animeInfo[0].views;
  res.render("updateAnime", {
    animeTitle: animeTitle,
    animeGenresId: animeGenresId,
    animeViews: animeViews,
    animeId: animeId,
    allGenres: allGenres,
  });
}

//add validation for creating/ updating an anime item
const minTitleLengthErr = "Title must have at least 1 character.";
const genreErr = "Select at least one genre.";
const viewsErr = "Views must be between 0 and 99.";

const { body, validationResult, matchedData } = require("express-validator");
const validateAnimeItem = [
  body("title").trim().isLength({ min: 1 }).withMessage(minTitleLengthErr),
  body("genre")
    .custom((value) => value || Array.isArray(value))
    .withMessage(genreErr),
  body("views").isInt({ min: 0, max: 99 }).withMessage(viewsErr),
];

const animeUpdatePost = [
  validateAnimeItem,
  async (req, res) => {
    const animeId = req.params.animeId;
    const animeInfo = await db.getAnimeInfo(animeId);
    const allGenres = await db.getAllGenres();
    const animeTitle = animeInfo[0].title;
    const animeGenresId = animeInfo.map((info) => info.genre_id);
    const animeViews = animeInfo[0].views;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("updateAnime", {
        animeTitle: animeTitle,
        animeGenresId: animeGenresId,
        animeViews: animeViews,
        animeId: animeId,
        allGenres: allGenres,
        errors: errors.array(),
      });
    }

    const { title, genre, views } = matchedData(req);
    await db.updateAnimeInfo(title, views, genre, animeId);
    res.redirect("/anime");
  },
];

async function addAnimeGet(req, res) {
  const allGenres = await db.getAllGenres();
  res.render("addAnime", { allGenres: allGenres });
}

const addAnimePost = [
  validateAnimeItem,
  async (req, res) => {
    const allGenres = await db.getAllGenres();
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("addAnime", {
        allGenres: allGenres,
        errors: errors.array(),
      });
    }

    const { title, genre, views } = matchedData(req);
    await db.addAnime(title, views, genre);
    res.redirect("/anime");
  },
];

async function deleteAnimePost(req, res, next) {
  const animeId = req.params.animeId;
  await db.deleteAnime(animeId);
  res.redirect("/anime");
}

async function confirmActionGet(req, res) {
  const animeId = req.params.animeId;
  res.render("password", { animeActionId: animeId });
}

const pwdErr = "Invalid password. Please try again.";
const validatePassword = [
  body("password")
    .trim()
    .equals(process.env.ADMIN_PASSWORD)
    .withMessage(pwdErr),
];

const confirmActionPost = [
  validatePassword,
  async (req, res, next) => {
    const errors = validationResult(req);
    const animeId = req.params.animeId;

    if (!errors.isEmpty()) {
      return res.status(400).render("password", {
        animeActionId: animeId,
        errors: errors.array(),
      });
    }

    next();
  },
];

module.exports = {
  showAllAnimeGet,
  animeInfoGet,
  animeUpdateGet,
  animeUpdatePost,
  addAnimeGet,
  addAnimePost,
  deleteAnimePost,
  confirmActionGet,
  confirmActionPost,
};
