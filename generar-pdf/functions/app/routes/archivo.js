const express = require("express")
const router = express.Router()
const {PDFDocument} = require('pdf-lib')
const fetch = require('node-fetch')

router.use(express.json())
router.use(express.urlencoded({ extended: false }));

router.get("/", async function(req,res) {
    var datas = req.query.data;
})



module.exports = router;