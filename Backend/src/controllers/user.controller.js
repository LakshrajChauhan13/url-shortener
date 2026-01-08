const { getAllUrls, deleteUrlbyId } = require('../dao/user.dao')
const { wrapAsync } = require('../utils/tryCatchWrapper')


const getAllUserUrls = wrapAsync(async(req , res) => {
    const userId = req.id
    const allUrls = await getAllUrls(userId)

    res.json({
        message : "All URLs",
        urls : allUrls,
        count : allUrls.length
    })
} )


const deleteUrl = wrapAsync(async(req , res) => {
    const id = req.params.id
    const userId = req.id
    
    const deletedContent = await deleteUrlbyId(id, userId)

    if(!deletedContent){
        return res.status(404).json({
            message: "Sorry! The content you are trying to delete, doesn't exists"
        })
    }
    
    res.json({
        deletedContent: deletedContent,
        message : "URL deleted",
    })
} )

module.exports = {
    getAllUserUrls, deleteUrl,
}

