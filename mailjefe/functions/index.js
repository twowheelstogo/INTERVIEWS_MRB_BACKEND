const functions = require("firebase-functions");

const app = require("./App");

exports.emailjefe = functions.https.onRequest(app);
