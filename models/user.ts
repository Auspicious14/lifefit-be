const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema: any = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel