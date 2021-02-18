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
    res.status(500).send("Can't create a bin.")
  }
});

app.get("/b", (req, res) => {
  const requestedBin = fs.readdirSync(`./Bins`);
  console.log(requestedBin)
  res.status(200).send(requestedBin);
});

app.get("/b/:id", (req, res) => {
  if (utils.getId(req.originalUrl)) {
  const requestedBinId = req.params.id;
  const requestedBin = fs.readFileSync(`./Bins/bin - ${requestedBinId}.json`);
  res.status(200).send(JSON.parse(requestedBin));
  }
});

app.put("/b/:id", (req, res) => {
  if (utils.getId(req.originalUrl)) {
  const { body } = req;
  const requestedBinId = req.params.id;
  fs.writeFileSync(
    `./Bins/bin - ${requestedBinId}.json`,
    JSON.stringify(body, null, 4)
  );
  const newJson = fs.readFileSync(`./Bins/bin - ${requestedBinId}.json`);
  res.status(200).send(JSON.parse(newJson));
  } else {
    res.status(404).send("Bin not found")
  }
});

app.delete("/b/:id", (req, res) => {
  if(utils.getId(req.originalUrl)){
  const requestedBinId = req.params.id;
  fs.unlinkSync(`./Bins/bin - ${requestedBinId}.json`, (error) => {
    if (error) {
      console.error(error);
    }
  });
  res.status(200).send(`bin - ${requestedBinId} has been deleted successfully`);
  }else{
    res.status(404).send('Bin not found')
  }
});

app.listen(3000, () => console.log("app listening on port 3000"));




