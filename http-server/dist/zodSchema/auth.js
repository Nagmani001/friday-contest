"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addQuestionSchema = exports.quizSchema = exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.email(),
    password: zod_1.z.string(),
    role: zod_1.z.enum(["admin", "student"]),
});
exports.signinSchema = zod_1.z.object({
    email: zod_1.z.email(),
    password: zod_1.z.string(),
});
exports.quizSchema = zod_1.z.object({
    title: zod_1.z.string(),
    questions: zod_1.z.array(zod_1.z.object({
        text: zod_1.z.string(),
        options: zod_1.z.array(zod_1.z.string()),
        correctOptionIndex: zod_1.z.number()
    }))
});
exports.addQuestionSchema = zod_1.z.array(zod_1.z.object({
    text: zod_1.z.string(),
    options: zod_1.z.array(zod_1.z.string()),
    correctOptionIndex: zod_1.z.number()
}));
//# sourceMappingURL=auth.js.map