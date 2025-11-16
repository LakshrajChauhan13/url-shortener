const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : { type : String , required : true },
    email : { type : String , required : true , unique : true},
    password : { type : String , required : true, }  // select: false prevents password from being returned by default
})

// Method to exclude password when converting to JSON
// userSchema.methods.toJSON = function() {
//     const user = this.toObject();
//     delete user.password;
//     delete user.__v;
//     return user;
// }

const userModel = mongoose.model("user" , userSchema)

module.exports = {
    userModel
}