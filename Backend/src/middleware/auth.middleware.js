const { UnauthorizedError } = require("../utils/errorHandler")
const { jwtTokenVerify } = require("../utils/helper")

async function authMiddleware(req , res , next){
    const token = req.cookies.accessToken
    if(!token) throw new UnauthorizedError("Please login first to continue")
    try{
        const decodeInfo = await jwtTokenVerify(token)
        req.id = decodeInfo.id
        next()
    } catch(err){
        throw new UnauthorizedError(" Invalid token or session expired")
    }    
}

// async function optionalAuthMiddleware(req , res , next){
//     const token = req.cookies.accessToken
//     if(token){
//         try{
//             const decodeInfo = await jwtTokenVerify(token)
//             req.id = decodeInfo.id
//         } catch(err){
//             throw new UnauthorizedError(" Invalid token or session expired")
//         }    
//     }
//     else{
//         req.id = null
//     }
//     next()
// }


module.exports = {
    authMiddleware,
    // optionalAuthMiddleware
}