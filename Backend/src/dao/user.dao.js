const { UrlModel } = require("../models/shortUrl.model.js");
const { userModel } = require("../models/user.model.js");
const { ConflictError, NotFoundError } = require("../utils/errorHandler.js");

async function userSave(name, email, hashPassowrd) {
  try {
    await userModel.create({
      name,
      email,
      password: hashPassowrd,
    });
    
  } 
  catch (err) {
    if (err.code == 11000) {
      console.log(err);
      throw new ConflictError("User already exists");
      
    }
    throw new Error(err);
  }

  return;
}


async function findUser(email){
     const response = await userModel.findOne({
        email : email 
    })
    if(!response) throw new NotFoundError("Invalid credentials ")
    return response
  }


async function findUserById(id){
     const response = await userModel.findOne({
        _id : id
    })
    if(!response) throw new NotFoundError("Invalid credentials ")
    return response
  }


async function getAllUrls(userId){
     const response = await UrlModel.find({
        userId : userId
    })
    return response
  }


async function deleteUrlbyId(id){
     const response = await UrlModel.findOneAndDelete({
         _id : id
    })
    return response
  }



module.exports = {
    userSave,
    findUser,
    findUserById,
    getAllUrls,
    deleteUrlbyId,
}