import express from 'express'
const userController = require('../controllers/auth')

const route = express.Router()

route.get('/signin', userController.getUser)
route.post('/signup', userController.signUp)
route.post('/login', userController.signUp)

module.exports = route