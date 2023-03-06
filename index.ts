import express from 'express'
const port = process.env.PORT || 4000
const env = require('env')
const mongoose = require('mongoose')
const route = require('./routes/auth')
const cookieParser = require('cookie-parser')

const app = express()
const URI = "mongodb+srv://Auspicious:auspicious14@auspicious14.nlnhjxf.mongodb.net/Auspicious14?retryWrites=true&w=majority"
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(port, () => console.log(`Server is listening on port ${port}`)))
.catch((error: any) => console.log(error))

app.use(express.json())
app.use(cookieParser())
// app.use(express.urlencoded({extended: true}))
app.use( route)
