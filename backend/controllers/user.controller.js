import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User does not exists",
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.json({
        success: false,
        message: "Password is incorrect",
      });
    }

    const token = createToken(user._id);

    return res.json({
      success: true,
      token,
      message: "Login successful",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({
      success: false,
      message: "All fields are required",
    });
  }
  try {
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({
        success: false,
        message: "User already exist",
      });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be atleast 8 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    return res.json({
      success: true,
      token,
      message: "Register successful",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export { loginUser, registerUser };
