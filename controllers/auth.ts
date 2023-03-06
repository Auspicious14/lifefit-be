const UserSchema = require("../models/user");
const bcrypt =  require('bcrypt')
const jwt = require('jsonwebtoken')
import { Request, Response } from "express";

const handleErrors =(err: any) => {
    console.log(err.message, err.code)
    const errors: any = {firstName: "", lastName: '', email: '', password: ''}

    if (err.code === 11000) {
        errors.email = 'Email already registered'
        return errors
    }
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}: any) => {
            console.log(properties)
            errors[properties.path] = properties.message
        })
    }

    return errors;
}
const expiresIn = 3 * 24 * 60 * 60
const createToken = (id: string) => {
  return jwt.sign({id}, 'lifefit secret key', {expiresIn})
}
const signUp = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const genSalt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, genSalt)
    const user = await UserSchema.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const token = createToken(user._id)
    res.cookie('jwt', token, {httpOnly: true, maxAge: expiresIn * 1000})
    res.status(201).json(user);
  } catch (err: any) {
      const errors = handleErrors(err)
      res.status(400).json({errors});
  }
};

const getUser = (req: Request, res: Response) => {
  UserSchema.find()
    .sort({ createdAt: -1 })
    .then((result: any) => res.send(result))
    .catch((err: any) => console.log(err));
};

module.exports = {
  signUp,
  getUser,
};
