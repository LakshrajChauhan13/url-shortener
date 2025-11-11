require('dotenv').config()
const express = require('express')
const { connectDB } = require('./src/db/db')
const { urlRouter } = require('./src/routes/shortUrl.routes')
const { redirectFromShortUrl } = require('./src/controllers/shortUrl.controller')
const { errorHandler } = require('./src/utils/errorHandler')
const cors = require('cors')
const { userRouter } = require('./src/routes/userAuth.routes')
const cookieParser = require('cookie-parser')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:5173" ,
    credentials: true,
}))

app.use('/api/auth' , userRouter)
app.use('/api/create' , urlRouter)  // router
app.get('/:id' , redirectFromShortUrl) 


app.use(errorHandler)


async function main(){
    try {
        await connectDB()
        app.listen(3000)
        console.log("Successfully connected to DB"); 
        console.log("Server is running on the port 3000");
    }
    catch(e){
        console.error(" failed in connecting to DB...");
    }
}

main()