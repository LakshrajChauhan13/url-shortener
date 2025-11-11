const MONGO_URI = process.env.MONGO_URI
const JWT_SECRET_USER = process.env.JWT_SECRET_USER


const cookieOptions = {
    httpOnly : true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 
}


module.exports = {
    MONGO_URI,
    JWT_SECRET_USER,
    cookieOptions
}