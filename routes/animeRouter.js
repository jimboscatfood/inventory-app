//a router for /anime route
const { Router } = require("express");
const animeRouter = Router();
const animeController = require("../controllers/animeController");

//route to /anime: show all anime items
animeRouter.get("/", animeController.showAllAnimeGet);

module.exports = animeRouter;
