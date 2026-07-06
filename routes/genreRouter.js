//a router for /genre route
const { Router } = require("express");
const genreRouter = Router();
const genreController = require("../controllers/genreController");

//route to /genre: show all anime items
genreRouter.get("/", genreController.showAllGenresGet);

module.exports = genreRouter;
