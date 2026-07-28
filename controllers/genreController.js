const db = require("../db/queries");

//display all anime items
async function showAllGenresGet(req, res) {
  const allGenres = await db.getAllGenres();
  res.render("genreList", {
    title: "List of Genres",
    allGenres: allGenres,
  });
}

async function showAnimeByGenreGet(req, res) {
  const genreId = req.params.genreId;
  const animeByGenre = await db.getAnimeByGenre(genreId);
  const genreName = animeByGenre[0] ? animeByGenre[0].name : undefined;

  res.render("viewGenre", {
    genreId: genreId,
    genreName: genreName,
    animeByGenre: animeByGenre,
  });
}

async function addGenreGet(req, res) {
  res.render("addGenre", {});
}

const minNameLengthErr = "Genre name must have at least 1 character.";

const { body, validationResult, matchedData } = require("express-validator");
const validateGenre = [
  body("genreName").trim().isLength({ min: 1 }).withMessage(minNameLengthErr),
];

const addGenrePost = [
  validateGenre,
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("addGenre", {
        errors: errors.array(),
      });
    }

    const { genreName } = matchedData(req);
    await db.addGenre(genreName);
    res.redirect("/genre");
  },
];

async function deleteGenrePost(req, res) {
  const genreId = req.params.genreId;
  await db.deleteGenre(genreId);
  res.redirect("/genre");
}

module.exports = {
  showAllGenresGet,
  showAnimeByGenreGet,
  addGenreGet,
  addGenrePost,
  deleteGenrePost,
};
