const express = require('express')
const { UrlModel } = require('../models/shortUrl.model')
const { createShortUrl, createCustomUrl } = require('../controllers/shortUrl.controller')
const { authMiddleware } = require('../middleware/auth.middleware')
const urlRouter = express.Router()


urlRouter.post('/', createShortUrl)  // short url without login
urlRouter.post('/user', authMiddleware ,createShortUrl)  // logged in user create short url
urlRouter.post('/user/custom-url' ,createCustomUrl)  // logged in user create custom url



module.exports = {
    urlRouter
}