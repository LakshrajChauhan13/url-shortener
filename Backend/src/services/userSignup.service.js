const { JWT_SECRET_USER } = require("../../config/config")
const { userSave } = require("../dao/user.dao")
const { UnauthorizedError } = require("../utils/errorHandler")
const bcrypt = require('bcrypt')
const { jwtTokenSign } = require("../utils/helper")

async function userSigningUpService(name, email, password){
    const hashPassowrd = await bcrypt.hash(password, 5);
    if(!hashPassowrd) throw new Error("Password not hashed")
    await userSave(name, email, hashPassowrd);
    return;
}


async function userSigningInService(user , password){
    console.log(user)    
    const isPasswordMatch = await bcrypt.compare(password , user.password)
    if(!isPasswordMatch){
      throw new UnauthorizedError(" Invalid credentials ")
    }
    if(isPasswordMatch){
      const token = await jwtTokenSign({id : user._id})      
      return token
    }
  }
    

module.exports = {
  userSigningUpService,
  userSigningInService
}