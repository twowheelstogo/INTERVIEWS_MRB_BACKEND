const functions = require("firebase-functions");
const app = require("./app");
exports.api_nodemailer = functions.https.onRequest(app);