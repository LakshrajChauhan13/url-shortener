const { nanoid } = require("nanoid");
const jwt = require('jsonwebtoken');
const { JWT_SECRET_USER } = require("../../config/config");

function generateNanoId (length){
    return nanoid(length)
}

async function jwtTokenSign(payload){
   return jwt.sign(payload, JWT_SECRET_USER , {expiresIn : "1h"} )
}

async function jwtTokenVerify(token){
    return jwt.verify(token, JWT_SECRET_USER )
}


module.exports = {
    generateNanoId,
    jwtTokenSign ,
    jwtTokenVerify
}