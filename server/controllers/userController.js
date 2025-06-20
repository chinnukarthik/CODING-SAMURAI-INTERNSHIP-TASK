import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../models/userModel.js";

export const test = (req, res) => {
  res.json({ message: "API is working" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }

  const updates = {};

  // Password Validation & Hashing
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters"));
    }
    updates.password = await bcryptjs.hash(req.body.password, 10);
  }

  // Username Validation
  if (req.body.username) {
    const username = req.body.username;
    if (username.length < 7 || username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 and 20 characters")
      );
    }
    if (username.includes(" ")) {
      return next(errorHandler(400, "Username can't contain spaces"));
    }
    if (username !== username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"));
    }
    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers")
      );
    }
    updates.username = username;
  }

  // Email Update
  if (req.body.email) {
    updates.email = req.body.email;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: updates },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
