const { saveShortUrl, getCustomUrl } = require("../dao/shortUrl")
const { generateNanoId } = require("../utils/helper")


async function createShortUrlWithoutUserService(url){
    const shortUrl = generateNanoId(7)
    if(!shortUrl) throw new Error("Short Url Not generated")
    await saveShortUrl(url , shortUrl )
    return shortUrl
}

async function createShortUrlWithUserService(url, userId, customUrl) {
    const shortUrl = customUrl || generateNanoId(7)
    
    const exists = await getCustomUrl(customUrl)
    if(exists) throw new Error("Custom URL already exists")
    await saveShortUrl(url , shortUrl , userId)
    return shortUrl
}



module.exports = {
    createShortUrlWithUserService,
    createShortUrlWithoutUserService,
   
}