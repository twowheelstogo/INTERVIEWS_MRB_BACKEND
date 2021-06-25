const functions = require("firebase-functions");
const app = require("./app");
exports.api_PdfMerge = functions.https.onRequest(app);
