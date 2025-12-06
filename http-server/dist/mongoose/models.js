"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: String,
    email: String,
    password: String,
    role: String
});
const questionSchema = new mongoose_1.default.Schema({
    text: String,
    options: [String],
    correctOptionIndex: Number
}, { _id: true });
const quizSchema = new mongoose_1.default.Schema({
    title: String,
    questions: {
        type: [questionSchema]
    }
});
exports.User = mongoose_1.default.model("User", userSchema);
exports.Quiz = mongoose_1.default.model("Quiz", quizSchema);
//# sourceMappingURL=models.js.map