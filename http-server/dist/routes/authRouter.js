"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt = require('bcrypt');
const auth_1 = require("../zodSchema/auth");
const models_1 = require("../mongoose/models");
const authMiddleware_1 = require("../middleware/authMiddleware");
exports.authRouter = (0, express_1.Router)();
const SALT_ROUNDS = 10;
exports.authRouter.post("/signup", async (req, res) => {
    const parsedData = auth_1.signupSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({
            success: false,
            error: "Invalid request schema",
            details: { email: "Invalid email format" }
        });
    }
    const { name, email, password, role } = parsedData.data;
    const userExistsOrNot = await models_1.User.findOne({ email: email }).exec();
    if (userExistsOrNot) {
        return res.status(400).json({
            success: false,
            error: "User with this email already exists",
            details: { email: "Already Exists" }
        });
    }
    const hash = bcrypt.hash(password, SALT_ROUNDS, async function (err, hash) {
        const user = new models_1.User({
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
        });
    });
});
exports.authRouter.post("/login", async (req, res) => {
    const parsedData = auth_1.signinSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({
            success: false,
            error: "Invalid request schema",
            details: { email: "Invalid email format" }
        });
    }
    const { email, password } = parsedData.data;
    const user = await models_1.User.findOne({ email }).exec();
    bcrypt.compare(password, user?.password, function (err, result) {
        if (!result) {
            return res.status(400).json({
                success: false,
                error: "Invalid email or password"
            });
        }
        else {
            const token = jsonwebtoken_1.default.sign({ _id: user?._id }, process.env.JWT_SECRET || "");
            res.status(200).json({
                success: true,
                data: { token }
            });
        }
    });
});
exports.authRouter.get("/me", authMiddleware_1.authMiddleware, async (req, res) => {
    if (!req.id)
        return;
    const user = await models_1.User.findById(req.id).exec();
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
//# sourceMappingURL=authRouter.js.map