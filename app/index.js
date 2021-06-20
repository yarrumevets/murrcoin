const express = require("express");
const Blockchain = require("../blockchain");
const bodyParser = require("body-parser");

// HTTP_PORT=1234 npm run dev
const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain();

app.use(bodyParser.json()); // creates a body obj in the request.

app.get("/blocks", (req, res) => {
  res.json(bc.chain);
});

app.post("/mine", (req, res) => {
  const block = bc.addBlock(req.body.data);
  console.log(`Block inserted: ${block.toString()}`);
  res.redirect("/blocks");
});

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
