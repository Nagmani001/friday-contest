import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
const bcrypt = require('bcrypt');
import { signinSchema, signupSchema } from "../zodSchema/auth";
import { User } from "../mongoose/models";
import { authMiddleware } from "../middleware/authMiddleware";

export const authRouter: Router = Router();
const SALT_ROUNDS = 10;

authRouter.post("/signup", async (req: Request, res: Response) => {
  const parsedData = signupSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({
      success: false,
      error: "Invalid request schema",
      details: { email: "Invalid email format" }
    });
  }
  const { name, email, password, role } = parsedData.data;

  const userExistsOrNot = await User.findOne({ email: email }).exec();

  if (userExistsOrNot) {
    return res.status(400).json({
      success: false,
      error: "User with this email already exists",
      details: { email: "Already Exists" }
    });
  }

  const hash = bcrypt.hash(password, SALT_ROUNDS, async function (err: any, hash: any) {

    const user = new User({
      name,
      email,
      password: hash,
      role
    });

    await user.save();
    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  });

});

authRouter.post("/login", async (req: Request, res: Response) => {
  const parsedData = signinSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      success: false,
      error: "Invalid request schema",
      details: { email: "Invalid email format" }
    });
  }
  const { email, password } = parsedData.data;

  const user = await User.findOne({ email }).exec();

  bcrypt.compare(password, user?.password, function (err: any, result: any) {
    if (!result) {
      return res.status(400).json({
        success: false,
        error: "Invalid email or password"
      });
    } else {
      const token = jwt.sign({ _id: user?._id }, process.env.JWT_SECRET || "");
      res.status(200).json({
        success: true,
        data: { token }
      });
    }
  });

});

authRouter.get("/me", authMiddleware, async (req: Request, res: Response) => {
  if (!req.id) return;

  const user = await User.findById(req.id).exec();

  res.status(200).json({
    success: true,
    data: {
      _id: req.id,
      name: user?.name,
      email: user?.email,
      role: user?.role
    }
  });
});
