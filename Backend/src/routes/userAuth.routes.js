const express = require('express')
const { signUpUser, signInUser, currentUser, signOutUser } = require('../controllers/userAuth.controller')
const { authMiddleware } = require('../middleware/auth.middleware')
const userAuthRouter = express.Router()

userAuthRouter.post('/signup' , signUpUser)
userAuthRouter.post('/signin' , signInUser)
userAuthRouter.post('/signout' , signOutUser )  
userAuthRouter.get('/me', authMiddleware , currentUser )


module.exports = {
    userAuthRouter
}
