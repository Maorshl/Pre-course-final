const express = require("express");
const app = express();
const fs = require("fs");
const uuid = require("uuid");

app.use(express.json());

app.post("/b", (req, res) => {
  const { body } = req;
  const id = uuid.v4().padStart(6, "0");
  fs.writeFileSync(`./Bins/bin - ${id}.json`, JSON.stringify(body, null, 4));
  res.status(200).send(body);
});

app.get("/b", (req, res) => {
  const requestedBin = fs.readdirSync(`./Bins`);
  res.status(200).send(requestedBin);
});

app.get("/b/:id", (req, res) => {
  const requestedBinId = req.params.id;
  const requestedBin = fs.readFileSync(`./Bins/bin - ${requestedBinId}.json`);
  res.status(200).send(JSON.parse(requestedBin));
});

app.put("/b/:id", (req, res) => {
  const { body } = req;
  const requestedBinId = req.params.id;
  fs.writeFileSync(
    `./Bins/bin - ${requestedBinId}.json`,
    JSON.stringify(body, null, 4)
  );
  const newJson = fs.readFileSync(`./Bins/bin - ${requestedBinId}.json`);
  res.status(200).send(JSON.parse(newJson));
});

app.delete("/b/:id", (req, res) => {
  const requestedBinId = req.params.id;
  fs.unlinkSync(`./Bins/bin - ${requestedBinId}.json`, (error) => {
    if (error) {
      console.error(error);
    }
  });
  res.status(200).send(`bin - ${requestedBinId} has been deleted successfully`);
});

app.listen(3000, () => console.log("app listening on port 3000"));
