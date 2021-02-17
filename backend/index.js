const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());

app.listen(3000, () => console.log("app listening on port 3000"));
