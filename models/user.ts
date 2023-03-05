const mongoose = require('mongoose')
const {isEmail} = require('validator')

const Schema = mongoose.Schema

const userSchema: any = new Schema({
    firstName: {
        type: String,
        required: [true, 'First Name required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last Name required'],
    },
    email: {
        type: String,
        required: [true, 'Email required'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Invalid email']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'password must be longer than 6']
    }
}, {timestamps: true})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel