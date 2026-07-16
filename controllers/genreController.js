const db = require("../db/queries");

//display all anime items
async function showAllGenresGet(req, res) {
  const allGenres = await db.getAllGenres();

  res.render("genreList", {
    title: "List of Genres",
    allGenres: allGenres,
  });
}

module.exports = { showAllGenresGet };
