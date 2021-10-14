const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const jsonWebToken = require("jsonwebtoken");
const crypto = require("crypto");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));
var myJWTSecretKey = "1234";

router.post("/send-mail", function (req, res) {
  //step 1

  var data = req.body;
  var to = data.to;
  var candidato = data.candidato;
  var reclutador = data.reclutador;
  var Plaza = data.plaza;
  var Comentarios = data.Comentarios;

  //step 1
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    ignoreTLS: false,
    secure: false, // use SSL
    auth: {
      user: "mrb.outsourcing.noreply@gmail.com",
      pass: "MRB$2021$",
    },
  });

  let mailOptions;
  if (Comentarios.length > 0) {
    //step 2
    mailOptions = {
      from: "mrb.outsourcing.noreply@gmail.com",
      to: `${to}`,
      subject: `Revisión Papelería MRB - Puesto: ${Plaza}`,
      text: `Estimado candidato ${candidato}, se le comenta que su papelería ha sido revisada por ${reclutador}, verificar en el siguiente link https://papersboxgt.com/Papeleria el avance que ha tenido su papelería en su proceso de reclutamiento para la plaza de ${Plaza}.   
                \nLas observaciones que debe de tomar en cuenta para subir nuevamente sus archivos son: \n${Comentarios}                     
                \nCualquier duda o inconveniente que tenga puede comunicarse al siguiente número (+502) 2299-7600 o al correo de soporte técnico soporte@twowheelstogo.com.`,
    };
  } else {
    //step 2
    mailOptions = {
      from: "mrb.outsourcing.noreply@gmail.com",
      to: `${to}`,
      subject: `Revisión Papelería MRB - Puesto: ${Plaza}`,
      text: `Estimado candidato ${candidato}, se le comenta que su papelería ha sido revisada por ${reclutador}, verificar en el siguiente link https://papersboxgt.com/Papeleria el avance que ha tenido su papelería en su proceso de reclutamiento para la plaza de ${Plaza}.                        
                \nCualquier duda o inconveniente que tenga puede comunicarse al siguiente número (+502) 2299-7600 o al correo de soporte técnico soporte@twowheelstogo.com.`,
    };
  }

  //step 3
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: "okay" });
    }
  });
});

router.post("/jwt", function (req, res) {
  var data = req.body;
  var id = data.id;
  var fecha = Date.now();
  const datos = {
    id: id,
    fecha: fecha,
  };

  const token = jsonWebToken.sign(datos, "1234", { expiresIn: "1h" });
  res.json({
    token: token,
  });
});

router.post("/jwtAdmin", function (req, res) {
  var data = req.body;
  var usuario = data.usuario;
  let hashedPass = crypto.createHash("sha512").update(data.pass).digest("hex");
  const datos = {
    usuario: usuario,
    pass: hashedPass,
  };

  const token = jsonWebToken.sign(datos, "1234", { expiresIn: "1h" });
  res.json({
    token: token,
  });
});

router.get("/verificar", function (req, res) {
  try {
    const tokenDecodedData = jsonWebToken.verify(
      req.query.token,
      myJWTSecretKey
    );

    return res.json({
      error: false,
      data: tokenDecodedData,
    });
  } catch (error) {
    res.json({
      error: true,
      data: error,
    });
  }
});

module.exports = router;
