import express from 'express'
const homeRouter = require('./routes/index')
const port = process.env.PORT || 4000
const app = express()


app.use('/', homeRouter)

app.listen(port, () => console.log(`Server is listening on port ${port}`))