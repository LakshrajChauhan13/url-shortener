const express = require('express')
const { UrlModel } = require('../models/shortUrl.model')
const { createShortUrl } = require('../controllers/shortUrl.controller')
const { authMiddleware } = require('../middleware/auth.middleware')
const urlRouter = express.Router()


urlRouter.post('/', createShortUrl)  // short url without login
urlRouter.post('/user', authMiddleware ,createShortUrl)  // logged in user create short url or custom url


module.exports = {
    urlRouter
}