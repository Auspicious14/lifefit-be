import express from 'express'
const userController = require('../controllers/user')

const route = express.Router()

route.get('/', userController.getUser)
route.post('/', userController.createUser)

module.exports = route