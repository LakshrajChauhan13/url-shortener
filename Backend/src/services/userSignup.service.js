const { JWT_SECRET_USER } = require("../../config/config")
const { userSave, findUser } = require("../dao/userAuth")
const { UnauthorizedError } = require("../utils/errorHandler")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { jwtTokenSign } = require("../utils/helper")

async function userSigningUpService(name, email, password){
    const hashPassowrd = await bcrypt.hash(password, 5);
    if(!hashPassowrd) throw new Error("Password not hashed")
    await userSave(name, email, hashPassowrd);
    return;
}


async function userSigningInService(response , password){
    const isPasswordMatch = await bcrypt.compare(password , response.password)
    if(!isPasswordMatch){
      throw new UnauthorizedError(" Invalid credentials ")
    }
    if(isPasswordMatch){
      const token = await jwtTokenSign({id : response._id})
      return token
    }
  }
    

module.exports = {
  userSigningUpService,
  userSigningInService
}