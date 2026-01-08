const express = require('express')
const { signUpUser, signInUser, currentUser, signOutUser } = require('../controllers/userAuth.controller')
const { authMiddleware } = require('../middleware/auth.middleware')
const { UrlModel } = require('../models/shortUrl.model')
const { getAllUserUrls, deleteUrl } = require('../controllers/user.controller')
const userRouter = express.Router()

userRouter.get('/get-urls' , authMiddleware , getAllUserUrls  )
userRouter.delete('/delete-urls/:id' , authMiddleware , deleteUrl  )


module.exports = {
    userRouter
}
