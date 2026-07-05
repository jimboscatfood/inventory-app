const express = require("express");
const app = express();
const path = require("node:path");
const animeRouter = require("./routes/animeRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extend: true }));

app.get("/", (req, res) => res.render("index"));
app.use("/anime", animeRouter);

//use port 3000 to listen to incoming requests
const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Inventory app is listening on port ${PORT}!`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});
