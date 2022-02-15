const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const main = express();

const usersRouter = require("./route/index");


main.use(cors());
main.use(bodyParser.json());
main.use(bodyParser.urlencoded( {extended: false} ));
main.use("/", usersRouter);
module.exports = main;
