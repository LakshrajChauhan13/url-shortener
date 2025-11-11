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

module.exports = {
    userSave,
    findUser
    
}