const { createShortUrlWithUserService, createShortUrlWithoutUserService } = require("../services/createShortUrl.service")
const { getShortUrl } = require("../dao/shortUrl")
const { wrapAsync } = require("../utils/tryCatchWrapper")

        
const createShortUrl = wrapAsync(async (req , res ) => {
    const { url , customUrl} = req.body;
    const userId = req.id;
    let shortUrl
    if(userId){
        shortUrl = await createShortUrlWithUserService(url , userId , customUrl) //userId        
    }
    else{
        shortUrl = await createShortUrlWithoutUserService(url) //userId        
    }   
    res.json({        
        shortUrl : shortUrl        
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
    redirectFromShortUrl
}
