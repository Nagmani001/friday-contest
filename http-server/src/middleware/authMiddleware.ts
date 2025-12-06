import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized, token missing or invalid"
    });
  };

  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET || "");

    //@ts-ignore
    req.id = verify._id;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized, token missing or invalid"
    });
  }
}
