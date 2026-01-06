const { createShortUrlWithUserService, createShortUrlWithoutUserService } = require("../services/createShortUrl.service")
const { getShortUrl } = require("../dao/shortUrl")
const { wrapAsync } = require("../utils/tryCatchWrapper")
const z = require('zod')
const { safeUrlSchema } = require("../zod/zod.user")
        
const createShortUrl = wrapAsync(async (req , res ) => {
    const parsedBody = safeUrlSchema.safeParse(req.body)

    if(!parsedBody.success){
        return res.status(400).json({
            message: "Invalid Format",
            errors: z.flattenError(parsedBody.error).fieldErrors
        })
    }
    const {url , customUrl} = parsedBody.data;
    const userId = req.id;
    console.log(customUrl)
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
