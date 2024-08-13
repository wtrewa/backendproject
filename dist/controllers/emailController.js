"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationCode = void 0;
const crypto_1 = __importDefault(require("crypto"));
const validator_1 = __importDefault(require("validator"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const errorHandler_1 = require("../helpers/errorHandler");
const sendVerificationCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    console.log(email);
    if (!email) {
        return next((0, errorHandler_1.createCustomError)(400, "Email is required"));
    }
    const verificationCode = crypto_1.default.randomInt(100000, 999999).toString();
    try {
        if (!validator_1.default.isEmail(email)) {
            return next((0, errorHandler_1.createCustomError)(400, "Invalid email format"));
        }
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: "Email Verification",
            text: `Your verification code is: ${verificationCode}`,
        };
        yield transporter.sendMail(mailOptions);
        res
            .status(200)
            .json({ message: "Verification code sent", code: verificationCode });
    }
    catch (error) {
        console.error("Error sending verification code:", error);
        next((0, errorHandler_1.createCustomError)(500, "Failed to send verification email"));
    }
});
exports.sendVerificationCode = sendVerificationCode;
//# sourceMappingURL=emailController.js.map