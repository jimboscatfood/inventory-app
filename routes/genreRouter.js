//a router for /genre route
const { Router } = require("express");
const genreRouter = Router();
const genreController = require("../controllers/genreController");

//route to /genre: show all anime items
genreRouter.get("/", genreController.showAllGenresGet);

//route to GET request to show the add genre page
genreRouter.get("/add", genreController.addGenreGet);

//route to POST request to add genre
genreRouter.post("/add", genreController.addGenrePost);

//route to POST request to delete a genre
genreRouter.post("/:genreId/delete", genreController.deleteGenrePost);

//route to GET request to show all anime of the same genre
genreRouter.get("/:genreId", genreController.showAnimeByGenreGet);

module.exports = genreRouter;
