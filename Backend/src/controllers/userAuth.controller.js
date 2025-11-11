const { cookieOptions } = require('../../config/config.js');
const { findUser } = require('../dao/userAuth.js');
const { userSigningInService, userSigningUpService } = require('../services/userSignup.service.js');
const { wrapAsync } = require('../utils/tryCatchWrapper.js');


const signUpUser = wrapAsync( async(req , res) => {
    const { name , email , password } = req.body
    await userSigningUpService(name , email , password)
    return res.json({
        message : "User signed Up"
    })
})

const signInUser = wrapAsync(async(req , res) => {
    const {email , password} = req.body
    const response = await findUser(email)
    const token = await userSigningInService(response , password)
    res.cookie("accessToken" , token , cookieOptions)
    res.status(200).json({ 
        message : "User Signed In"
    })

})


module.exports = {
    signUpUser,
    signInUser
}