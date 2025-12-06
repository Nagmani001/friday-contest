"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require('dotenv').config();
const authRouter_1 = require("./routes/authRouter");
const quizRouter_1 = require("./routes/quizRouter");
const mongoose_1 = __importDefault(require("mongoose"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/auth", authRouter_1.authRouter);
app.use("/api/quiz", authMiddleware_1.authMiddleware, quizRouter_1.quizRouter);
async function main() {
    try {
        await mongoose_1.default.connect(process.env.DATABASE_URL || "");
        app.listen(3000, () => {
            console.log("server is running on port 3000 and connected to database");
        });
    }
    catch (err) {
        console.log("error while connecting to database");
    }
}
main();
//# sourceMappingURL=index.js.map