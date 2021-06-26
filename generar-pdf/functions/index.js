const functions = require("firebase-functions");
const app = require("./app");
exports.api_PdfCreate = functions.https.onRequest(app);