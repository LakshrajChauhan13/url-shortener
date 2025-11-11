const mongoose = require('mongoose');
const { MONGO_URI } = require('../../config/config');

async function connectDB (){
        await mongoose.connect(MONGO_URI)
}

module.exports = {
    connectDB
}