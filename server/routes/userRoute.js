import express from "express";
import { test } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/test", test);
userRouter.put("/upadate:id",updateUser)

export default userRouter;
