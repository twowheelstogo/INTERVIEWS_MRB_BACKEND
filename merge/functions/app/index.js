const express = require("express");
const cors  = require("cors");
const bodyParser = require("body-parser");
const main = express();

var pdfRouter = require('./routes/pdf');

main.use(cors());
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
main.use('/pdf-merge', pdfRouter);

module.exports = main;