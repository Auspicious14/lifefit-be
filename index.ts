import express from 'express'
const env = require('dotenv')
env.config()
const port = process.env.PORT || 8000
const mongoose = require('mongoose')
const route = require('./routes/auth')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
const URI = "mongodb+srv://Auspicious:auspicious14@auspicious14.nlnhjxf.mongodb.net/Auspicious14?retryWrites=true&w=majority"
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(port, () => console.log(`Server is listening on port ${port}`)))
.catch((error: any) => console.log(error))

const whiteList=['http://localhost:5000']
const corsOption =  {
    origin: (origin: any, callback: any ) => {
        if (whiteList.indexOf(origin) !== -1) return callback(null, true)
        callback(new Error('Not allowed by CORS'))
    }
}
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOption))
// app.use(express.urlencoded({extended: true}))
app.use( route)
