const { request, response } = require("express");
const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());

app.post("/b", (req, res) => {
  const { body } = req;
  const id = Math.random().toString(36).substr(2, 9);
  fs.writeFileSync(`bin - ${id}.json`, JSON.stringify(body, null, 4));
  res.status(200).send(body);
});

app.get("/b/:id", (req, res) => {
  const requestedBinId = req.params.id;
  const requestedBin = fs.readFileSync(`./bin - ${requestedBinId}.json`);
  res.status(200).send(JSON.parse(requestedBin));
});

app.listen(3000, () => console.log("app listening on port 3000"));
