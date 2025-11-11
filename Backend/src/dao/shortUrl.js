const { UrlModel } = require("../models/shortUrl.model");
const { ConflictError } = require("../utils/errorHandler");

async function saveShortUrl(url ,shortUrl , userId){
    try{
        const newUrl = new UrlModel({         // to save the data in memory . until we call newUrl.save() , it will not save the data in the DBS
            fullUrl : url,
            shortUrl : shortUrl
        })
        
        if(userId){
            newUrl.userId = userId
            console.log(userId);  
        }
        
        await newUrl.save()
        return
    }
    catch(err){
        if(err.code == 11000){  // the default code of the duplicacy or conflict error
            throw new ConflictError( "shortUrl already exists" , err)            // so call this only when there is the duplicacy / conflict error occured 
        }
        throw new Error(err)

    }
}


async function getShortUrl(shortUrl) {
    try {
        const url = await UrlModel.findOneAndUpdate({
            shortUrl : shortUrl
        },{
            $inc : {clicks : 1}
        },
        {
            new: true 
        })
        
        return url
    }
    catch(e){
        return
    }
}

async function getCustomUrl(customUrl) {
    return await UrlModel.findOne({
        shortUrl : customUrl
    })
}

module.exports = {
    saveShortUrl ,
    getShortUrl,
    getCustomUrl
}