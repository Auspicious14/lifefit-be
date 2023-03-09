import mongoose from "mongoose";

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  type: { type: String },
  features: [
    {
      type: {
        type: String,
      },
      properties: [
        {
          name: { type: String },
          country: { type: String },
          country_code: { type: String },
          state: { type: String },
          city: { type: String },
          street: { type: String },
          lat: { type: String },
          lon: { type: String },
          formatted: { type: String },
          place_id: { type: String },
        },
      ],
      geometry: [
        {
          type: { type: String },
          coordinates: { type: [String] },
        },
      ],
    },
  ],
});

const placeModel = mongoose.model("place", placeSchema);
module.exports = placeModel;
