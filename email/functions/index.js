const functions = require("firebase-functions");

const app = require("./App");

exports.emailjefeinmediato = functions.https.onRequest(app);
