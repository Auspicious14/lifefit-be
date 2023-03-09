const express = require("express");
const { signUpUser, getUser, logInUser } = require("../controllers/auth");
const { getPlaces } = require("../controllers//places");
// const { verifyToken } = require("../middlewares/authToken");
import verifyToken from "../middleware/authToken";
const route = express.Router();

route.get("/", verifyToken, getUser);
route.post("/signup", signUpUser);
route.post("/login", logInUser);
route.get("/places", getPlaces);

module.exports = route;
