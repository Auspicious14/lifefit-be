const fetch = require("node-fetch");
import { Request, Response } from "express";
import env from "dotenv";
const placeModel = require("../models/place");
env.config();

const apiKey = process.env.API_KEY;
const requestOptions = {
  method: "GET",
};

module.exports.getPlaces = async (req: Request, res: Response) => {
  try {
    const response = await fetch(
      `https://api.geoapify.com/v2/places?${req.query.categories}?${req.query.filter}?${req.query.conditions}&apiKey=${apiKey}`,
      requestOptions
    );

    console.log(req.query);
    const data = await response.json();
    const create = await placeModel.create(data);
    res.json(create);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
