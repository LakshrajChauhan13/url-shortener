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
    const {id} = req.body
    await deleteUrlbyId(id)

    res.json({
        message : " URL deleted ",
    })
} )

module.exports = {
    getAllUserUrls, deleteUrl,
}

