const express = require('express')
const { signUpUser, signInUser } = require('../controllers/userAuth.controller')
const userRouter = express.Router()

userRouter.post('/signup' , signUpUser)
userRouter.post('/signin' , signInUser)


module.exports ={
    userRouter
}