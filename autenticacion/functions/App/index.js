const express = require("express");
const cors  = require("cors");
const bodyParser = require("body-parser");
const main = express();

var usersRouter = require('./routes/autenticacion');


main.use(cors());
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
main.use('/', usersRouter);

module.exports = main;