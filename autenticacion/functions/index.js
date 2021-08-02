const functions = require("firebase-functions");
const app = require("./app");
exports.autenticacion = functions.https.onRequest(app);