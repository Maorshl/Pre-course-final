const fs = require("fs")
const logger = (req, res, next) => {
    console.log(
      `${req.protocol}://${req.get("host")}${
        req.originalUrl
      }:${new Date()}`
    );
    next();
  };
const waitSecond = function(req, res, next){
    setTimeout(next, 1000);
    console.log("waited")
  }

const testReq = function(req, res, next){
    if (req.originalUrl[0] === "/" && req.originalUrl[1] === "b") {
        next()
        console.log("tested req")
    } else {
        res.status(400).send("Invaild syntex")
    }
}
const getId = function(originalUrl){
    let exist = false
    const bins = fs.readdirSync('./Bins');
    originalUrl = originalUrl.slice(3)
    console.log(originalUrl)
    for (let name of bins) {
         name = name.slice(6, -5)
         console.log(name)
        if (name === originalUrl ) {
            exist =  true
        } 
    }
    console.log(exist)
    return exist
}

  module.exports = {
      logger: logger,
      waitSecond: waitSecond,
      testReq: testReq,
      getId: getId,
  }