const functions = require("firebase-functions");
const app = require("./app");
exports.api_mrb_papeleria = functions.https.onRequest(app);