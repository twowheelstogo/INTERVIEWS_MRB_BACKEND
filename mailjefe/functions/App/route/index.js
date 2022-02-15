const express = require("express");

const nodemailer = require("nodemailer");
// eslint-disable-next-line new-cap
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded( {extended: false} ));


router.post("/sendmail", (req, res )=>{
  const data =req.body;
  const to =data.to;
  const subject = data.subject;
  const emailbody = data.emailbody;
  try {
    const transporter = nodemailer.createTransport({// use SSLs
      service: "gmail",
      auth: {
        user: "logistica@mrb.gt",
        pass: "MRB2021@",
      },
    });

    const mailOptions = {
      from: "",
      to: `${to}`,
      subject: `${subject}`,
      text: `${emailbody}`,
    };

    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        res.status(500).json( {error: err.message} );
      } else {
        res.status(200).json( {message: "okay"} );
      }
    } );
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

// https://us-central1-empleosmrb.cloudfunctions.net/emailjefeinmediato
