const express = require("express");
const router = express.Router();
const { PDFDocument } = require("pdf-lib");
const fetch = require("node-fetch");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/", async function (req, res) {
  var datas = req.query.data;  

  // Load cover and content pdfs
  var files = [];
  const url = `${datas[0]}`;
  for (var i = 0; i < datas.length; i++) {
    const url = `${datas[i]}`;
    const PdfBytes = await fetch(url).then((res) => res.arrayBuffer());
    const cover = await PDFDocument.load(PdfBytes);
    files.push(cover);
  }

  // Create a new document
  const doc = await PDFDocument.create();

  // Add individual content pages
  for (var i = 0; i < files.length; i++) {
    const contentPages = await doc.copyPages(
      files[i],
      files[i].getPageIndices()
    );
    for (const page of contentPages) {
      doc.addPage(page);
    }
  }
  let data1 = await doc.save();
  let binary = await data1;
  res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-disposition": `attachment;filename=${req.query.nombre}.pdf`,
    "Content-Length": binary.length,
  });

  res.end(Buffer.from(binary, "binary"));
});

module.exports = router;
