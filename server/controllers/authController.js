import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
// Signup Controller
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }
  const hashPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });
  try {
    await newUser.save();
    res.json("Successfully signup");
  } catch (err) {
    next(err);
  }
};

// signin Controller
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (email === "" || password === "" || !email || !password) {
    next(errorHandler(400, "All fields are required"));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_TOKEN);

    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (err) {
    next(err);
  }
};
