const { cookieOptions } = require('../../config/config.js');
const { findUser, findUserById } = require('../dao/user.dao.js');
const { userSigningInService, userSigningUpService } = require('../services/userSignup.service.js');
const { wrapAsync } = require('../utils/tryCatchWrapper.js');
const { NotFoundError } = require('../utils/errorHandler.js');


const signUpUser = wrapAsync( async(req , res) => {
    const { name , email , password } = req.body;    
    await userSigningUpService(name , email , password);    
    return res.status(200).json({        
        message : "User signed Up Successfully",        
    });    
});

const signInUser = wrapAsync(async(req , res) => {
    const {email , password} = req.body;    
    const user = await findUser(email);    
    const token = await userSigningInService(user , password);    
    res.cookie("accessToken", token, cookieOptions);    
    const { password : _pwd , _id : ___id , __v : ___v , ...userSafe } = user.toObject()    
    console.log(userSafe)
    res.status(200).json({
        userSafe : userSafe,
        message : "User Signed In Successfully"
    });    
});


const currentUser = wrapAsync(async (req , res) => {
    const userId =  req.id;    
    const user = await findUserById(userId);    
    if(!user) throw new NotFoundError(" Invalid credentials");    
    const { password : _pwd , _id : ___id , __v : ___v , ...userSafe } = user.toObject()    
    return res.status(200).json({
        userSafe : userSafe,
        message : " user's details"
    });    
})

const signOutUser = wrapAsync((req , res) => {
    const token = req.cookies.accessToken
    if(token){
        // Clear cookie with the same options used when setting it
        res.clearCookie("accessToken", cookieOptions)
        res.status(200).json({
            message : "User Signed Out Successfully"
        })
    } else {
        res.status(400).json({
            message : "No active session"
        })
    }
})

module.exports = {
    signUpUser,
    signInUser,
    currentUser,
    signOutUser
}