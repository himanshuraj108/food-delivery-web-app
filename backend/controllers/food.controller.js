import foodModel from "../models/food.model.js";
import fs from "fs";

// add food item

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    return res.json({
      success: true,
      message: "Food Added",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    return res.json({ success: true, data: foods });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const removeFood = async (req, res) => {
  try {
    const removeFoods = await foodModel.findById(req.body.id);
    if (!removeFoods) {
      return res.json({
        success: false,
        message: "Item not found",
      });
    }
    fs.unlink(`uploads/${removeFood.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);
    return res.json({ success: true, message: "Item removed" });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export { addFood, listFood, removeFood };
