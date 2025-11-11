const { UnauthorizedError } = require("../utils/errorHandler")
const { jwtTokenVerify } = require("../utils/helper")

async function authMiddleware(req , res , next){
    const token = req.cookies.accessToken
    if(!token) throw new UnauthorizedError("please login first")
    try{
        const decodeInfo = await jwtTokenVerify(token)
        req.id = decodeInfo.id
        next()
    } catch(err){
        throw new UnauthorizedError(" Invalid token ")
    }    
}

module.exports = {
    authMiddleware
}