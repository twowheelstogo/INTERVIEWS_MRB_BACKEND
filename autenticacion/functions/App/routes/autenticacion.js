const express = require("express")
const crypto = require("crypto");
const router = express.Router()
const jsonWebToken = require('jsonwebtoken');

router.use(express.json())
router.use(express.urlencoded({ extended: false }));
var myJWTSecretKey = '1234'; 

router.post('/jwt', function(req, res) {
    
    var data = req.body    
    var id = data.id
    var fecha = Date.now();
    const datos = {
        id: id,
        fecha: fecha
    };

    const token = jsonWebToken.sign(datos, "1234", { expiresIn: "15min"});
    res.json({
        token: token
    });
})

router.get('/verificar', function(req,res){
    try {
        const tokenDecodedData = jsonWebToken.verify(req.query.token, myJWTSecretKey);
        return res.json({
            error: false,
            data: tokenDecodedData
        });
    } catch (error) {
        res.json({
            error: true,
            data: error
        });
    }
})


module.exports = router;