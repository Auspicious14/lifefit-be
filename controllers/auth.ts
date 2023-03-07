const UserSchema = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotevn = require("dotenv");
import { Request, Response } from "express";
dotevn.config();

const handleErrors = (err: any) => {
  console.log(err.message, err.code);
  const errors: any = { firstName: "", lastName: "", email: "", password: "" };

  if (err.code === 11000) {
    errors.email = "Email already registered";
    return errors;
  }
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }: any) => {
      console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};
const expiresIn = 3 * 24 * 60 * 60;
const createToken = (id: string) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn });
};

module.exports.signUpUser = async (req: Request, res: Response) => {
  console.log(req.body);
  const { firstName, lastName, email, password } = req.body;

  console.log(password);
  try {
    const genSalt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, genSalt);
    const user = await UserSchema.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: expiresIn * 1000 });
    res.json({ user });
  } catch (err: any) {
    const errors = handleErrors(err);
    res.json({ errors });
  }
};

module.exports.logInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // console.log({email, password});
  try {
    const user = await UserSchema.findOne({ email });
    if (!user) return res.json({ error: "Incorrect email" });
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) return res.json({ error: "Password does not match" });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: expiresIn * 1000 });
    res.json({ auth: true, token, user });
  } catch (error) {
    const { email, password } = handleErrors(error);
    res.json({ email, password });
  }
};

module.exports.getUser = (req: Request, res: Response) => {
  UserSchema.find()
    .sort({ createdAt: -1 })
    .then((result: any) => res.send(result))
    .catch((err: any) => console.log(err));
};
