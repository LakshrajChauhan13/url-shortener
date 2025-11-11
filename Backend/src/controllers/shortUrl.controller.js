const { createShortUrlWithUserService, createShortUrlWithoutUserService, createCustomUrlService } = require("../services/createShortUrl.service")
const { getShortUrl } = require("../dao/shortUrl")
const { wrapAsync } = require("../utils/tryCatchWrapper")

        
const createShortUrl = wrapAsync(async (req , res ) => {
    const { url } = req.body
    const userId = req.id

    if(userId){
        const shortUrl = await createShortUrlWithUserService(url , userId) //userId
         res.json({
            shortUrl : shortUrl
        })
    }
    else{
        const shortUrl = await createShortUrlWithoutUserService(url) //userId
        res.json({
            shortUrl : shortUrl
        })
    }  
})

const createCustomUrl = wrapAsync( async(req , res) => {
    const { url , customUrl} = req.body
    const userId = req.id

    await createShortUrlWithUserService(url, userId, customUrl)
    res.json({
        url : `http://localhost:3000/${customUrl}`
    })

})

const redirectFromShortUrl = wrapAsync(async(req , res ) => {
    const shortUrl = req.params.id 
    const url = await getShortUrl(shortUrl)
    
    if(!url) throw new Error (" Short Url Not found")
    res.redirect(url.fullUrl)
})


module.exports = {
    createShortUrl,
    createCustomUrl,
    redirectFromShortUrl
}
