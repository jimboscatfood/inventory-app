//a router for /anime route
const { Router } = require("express");
const animeRouter = Router();
const animeController = require("../controllers/animeController");

//route to /anime: show all anime items
animeRouter.get("/", animeController.showAllAnimeGet);

//route for the GET request to the anime viewing page
//when user click on the anchor element on the animeList page, the page will assign the anime ID as the req param (":animeId")
animeRouter.get("/:animeId", animeController.animeInfoGet);

//route for the GET request to anime updating page
animeRouter.get("/:animeId/update", animeController.animeUpdateGet);

module.exports = animeRouter;
