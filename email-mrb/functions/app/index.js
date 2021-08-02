const express = require("express");
const cors  = require("cors");
const bodyParser = require("body-parser");
const main = express();

var usersRouter = require('./routes/users');


main.use(cors());
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
main.use('/', usersRouter);

module.exports = main;