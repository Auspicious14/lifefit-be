import express from "express";
const { signUpUser, getUser, logInUser } = require("../controllers/auth");
const { verifyToken } = require("../middlewares/authToken");
const route = express.Router();

route.get("/", verifyToken, getUser);
route.post("/signup", signUpUser);
route.post("/login", logInUser);

module.exports = route;
