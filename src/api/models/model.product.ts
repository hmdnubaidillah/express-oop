import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },

  quantity: {
    type: Number,
    required: [true, "Product quantity is required"],
  },

  category: {
    type: [String],
    required: [true, "Product category is required"],
  },

  desc: {
    type: String,
  },
});

export const Product = model("Product", ProductSchema);
