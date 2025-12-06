import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
});

const questionSchema = new mongoose.Schema({
  text: String,
  options: [String],
  correctOptionIndex: Number
}, { _id: true });

const quizSchema = new mongoose.Schema({
  title: String,
  questions: {
    type: [questionSchema]
  }
});

export const User = mongoose.model("User", userSchema);
export const Quiz = mongoose.model("Quiz", quizSchema); 
