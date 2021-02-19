const express = require("express");
const app = express();
const fs = require("fs");
const uuid = require("uuid");
const utils = require("./utils.js");

app.use(utils.testReq)
app.use(utils.logger)
app.use(utils.waitSecond)
app.use(express.json());


app.post("/b", (req, res) => {
  const { body } = req;
  const id = uuid.v4();
  try {
  fs.writeFileSync(`./Bins/bin - ${id}.json`, JSON.stringify(body, null, 4));
  res.status(200).send(body);
  } catch {
    res.status(500)
    throw new Error("Can't create a bin.")
  }
});

app.get("/b", (req, res) => {
  try {
  const requestedBin = fs.readdirSync(`./Bins`);
  res.status(200).send(requestedBin)
  } catch {
    res.status(500)
    throw new Error("Can't read requested directory.")
  }
});

app.get("/b/:id", (req, res) => {
  if (utils.getId(req.originalUrl)) {
  const requestedBinId = req.params.id;
  try {
  const requestedBin = fs.readFileSync(`./Bins/bin - ${requestedBinId}.json`);
  res.status(200).send(JSON.parse(requestedBin));
  } catch {
    res.status(500);
    throw new Error("Can't reach requested file.")
  }
  } else {
    res.status(404)
    throw new Error("Bin not found.")
  }
});

app.put("/b/:id", (req, res) => {
  if (utils.getId(req.originalUrl)) {
  const { body } = req;
  const requestedBinId = req.params.id;
  try {
    fs.writeFileSync(
    `./Bins/bin - ${requestedBinId}.json`,
    JSON.stringify(body, null, 4)
  );
  const newJson = fs.readFileSync(`./Bins/bin - ${requestedBinId}.json`);
  res.status(200).send(JSON.parse(newJson))}catch{
    res.status(500)
    throw new Error("con't write to bin")
  }
  } else {
    res.status(404)
    throw new Error("Bin not found")
  }
});

app.delete("/b/:id", (req, res) => {
  if(utils.getId(req.originalUrl)){
  const requestedBinId = req.params.id;
  fs.unlinkSync(`./Bins/bin - ${requestedBinId}.json`, (error) => {
    if (error) {
      throw new Error(error);
    }
  });
  res.status(200).send(`bin - ${requestedBinId} has been deleted successfully`);
  }else{
    res.status(404)
    throw new Error("Bin not found.")
  }
});

app.listen(3000, () => console.log("app listening on port 3000"));




