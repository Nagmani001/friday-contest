import { Router, Request, Response } from "express";
import { addQuestionSchema, quizSchema } from "../zodSchema/auth";
import { authMiddleware } from "../middleware/authMiddleware";
import { Quiz, User } from "../mongoose/models";

export const quizRouter: Router = Router();

quizRouter.post("/", async (req: Request, res: Response) => {
  const parsedData = quizSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      success: false,
      error: "Invalid request schema",
      details: { title: "Title is required" }
    });
  }
  const userId = req.id;
  if (!userId) return;
  const user = await User.findById(userId).exec();
  if (!user) return;

  if (!(user.role == "admin")) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized, admin access required"
    });
  }
  const { title, questions } = parsedData.data;

  try {
    const quiz = new Quiz({
      title,
      questions
    });

    await quiz.save();

    res.status(201).json({
      success: true,
      data: {
        _id: quiz._id,
        title
      }
    });
  } catch (err) {
    console.log("error", err);
  }
});

quizRouter.post("/:quizId/questions", async (req: Request, res: Response) => {
  const parsedData = addQuestionSchema.safeParse(req.body);
  const quizId = req.params.quizId;

  if (!parsedData.success) {
    return res.status(400).json({
      success: false,
      error: "Invalid request schema",
      details: { text: "Question text is required" }
    });
  }
  try {
    const quiz = await Quiz.findByIdAndUpdate(
      quizId,
      {
        $push: {
          questions: {
            text: "What is 2 + 2?",
            options: ["1", "2", "3", "4"],
            correctOptionIndex: 3
          }
        }
      },
      { new: true }
    );
    res.json({
      success: true,
      data: {
        quizId: "quiz123",
        question: {
          _id: "q111",
          text: "What is Node.js?",
          options: ["Runtime", "Framework", "Library"],
          correctOptionIndex: 0
        }
      }
    });

  } catch (err) {
    console.log("error");
  }
});

quizRouter.get("/:quizId", (req: Request, res: Response) => {
  res.json({
    msg: "hi from signup"
  })
});
