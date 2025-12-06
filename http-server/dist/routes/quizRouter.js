"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../zodSchema/auth");
const models_1 = require("../mongoose/models");
exports.quizRouter = (0, express_1.Router)();
exports.quizRouter.post("/", async (req, res) => {
    const parsedData = auth_1.quizSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({
            success: false,
            error: "Invalid request schema",
            details: { title: "Title is required" }
        });
    }
    const userId = req.id;
    if (!userId)
        return;
    const user = await models_1.User.findById(userId).exec();
    if (!user)
        return;
    if (!(user.role == "admin")) {
        return res.status(401).json({
            success: false,
            error: "Unauthorized, admin access required"
        });
    }
    const { title, questions } = parsedData.data;
    try {
        const quiz = new models_1.Quiz({
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
    }
    catch (err) {
        console.log("error", err);
    }
});
exports.quizRouter.post("/:quizId/questions", async (req, res) => {
    const parsedData = auth_1.addQuestionSchema.safeParse(req.body);
    const quizId = req.params.quizId;
    if (!parsedData.success) {
        return res.status(400).json({
            success: false,
            error: "Invalid request schema",
            details: { text: "Question text is required" }
        });
    }
    try {
        const quiz = await models_1.Quiz.findByIdAndUpdate(quizId, {
            $push: {
                questions: {
                    text: "What is 2 + 2?",
                    options: ["1", "2", "3", "4"],
                    correctOptionIndex: 3
                }
            }
        }, { new: true });
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
    }
    catch (err) {
        console.log("error");
    }
});
exports.quizRouter.get("/:quizId", (req, res) => {
    res.json({
        msg: "hi from signup"
    });
});
//# sourceMappingURL=quizRouter.js.map