import express from "express";
require('dotenv').config();
import { authRouter } from "./routes/authRouter";
import { quizRouter } from "./routes/quizRouter";
import mongoose from "mongoose";
import { authMiddleware } from "./middleware/authMiddleware";

const app = express();

declare global {
  namespace Express {
    interface Request {
      id: String | null
    }
  }
}

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/quiz", authMiddleware, quizRouter);

async function main() {
  try {
    await mongoose.connect(process.env.DATABASE_URL || "");
    app.listen(3000, () => {
      console.log("server is running on port 3000 and connected to database");
    });
  } catch (err) {
    console.log("error while connecting to database");
  }
}
main();
