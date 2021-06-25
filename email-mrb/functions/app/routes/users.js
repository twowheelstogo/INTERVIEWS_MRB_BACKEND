  
const express = require("express")
const router = express.Router()
const nodemailer = require('nodemailer')

router.use(express.json())
router.use(express.urlencoded({ extended: false }));

router.post("/", function(req,res) {
    //step 1

    var data = req.body;
    var to = data.to;
    var candidato = data.candidato;
    var reclutador = data.reclutador;
    var Plaza = data.plaza;

        //step 1
        let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                ignoreTLS: false,
                secure: false, // use SSL            
            auth: {
                user: "mrboutsorcing.noreply@gmail.com",
                    pass: "mrboutsorcing2021"
            }
        });  

        //step 2
        let mailOptions = {
            from: "mrboutsorcing.noreply@gmail.com",
            to: `${to}`,
            subject: `Revisión Papelería MRB - Puesto: ${Plaza}`,
            text: `Estimado candidato ${candidato}, se le comenta que su papelería ha sido revisada por ${reclutador}, verificar en el siguiente link https://empleos.mrb.gt/MRB/Papeleria el avance que ha tenido su papelería en su proceso de reclutamiento para la plaza de ${Plaza}.
            \nCualquier duda o inconveniente que tenga puede comunicarse al siguiente numero (+502) 2299-7600 o al correo de soporte tecnico soporte@twowheelstogo.com.`
        }

        //step 3
        transporter.sendMail(mailOptions,function(err,data){
            if(err){
                res.status(500).json({error: err.message});
            }
            else{
                res.status(200).json({message: "okay"});
            }
        });      
})

module.exports = router;