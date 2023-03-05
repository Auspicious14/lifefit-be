const UserSchema = require("../models/user");
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
const signUp = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await UserSchema.create({
      firstName,
      lastName,
      email,
      password,
    });
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
