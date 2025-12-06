import { z } from "zod";

export const signupSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
  role: z.enum(["admin", "student"]),
});

export const signinSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const quizSchema = z.object({
  title: z.string(),
  questions: z.array(z.object({
    text: z.string(),
    options: z.array(z.string()),
    correctOptionIndex: z.number()
  }))
});

export const addQuestionSchema = z.array(z.object({
  text: z.string(),
  options: z.array(z.string()),
  correctOptionIndex: z.number()
}));
