const express = require("express")
const router = express.Router()
const {degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib')
const fetch = require('node-fetch')

router.use(express.json())
router.use(express.urlencoded({ extended: false }));

router.get("/", async function(req,res) {
    var nombre = req.query.nombre;
    var fecha = req.query.fecha;
    var reclutador = req.query.reclutador;
    var checklist = req.query.checklist;

    //url contiene el archivo formik
    const url = 'https://firebasestorage.googleapis.com/v0/b/empleosmrb.appspot.com/o/Papeleria_MRB%2Flistado%20-%20Copy%20of%20Check%20List%20Nuevo%201%20(1).pdf?alt=media&token=2ee77b9f-5485-4a6a-b2a3-6fab3e7cfe7b'
    const formPdfBytes = await fetch(url).then(res => res.arrayBuffer())

    const pdfDoc = await PDFDocument.load(formPdfBytes)
  
    const form = pdfDoc.getForm()

    form.getTextField('Nombre').setText(nombre);
    form.getTextField('Fecha').setText(fecha);
    form.getTextField('Firma').setText(reclutador);


    for(var i = 0; i < checklist.length;i++)
    {
      form.getCheckBox(checklist[i]).check();                  
    }                                                           

    form.flatten();

  const pdfBytes = await pdfDoc.save()
  let binary = await pdfBytes;
  res.writeHead(200, {
    'Content-Type': "application/pdf",
    'Content-disposition': 'attachment;filename=documentacion.pdf',
    'Content-Length': binary.length
  });

  res.end(Buffer.from(binary, 'binary'));
})





module.exports = router;
