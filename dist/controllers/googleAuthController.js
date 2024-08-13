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
exports.googleCallback = exports.googleAuth = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:8080/auth/google/callback";
const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
const googleAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authUrl = client.generateAuthUrl({
        access_type: "offline",
        scope: ["profile", "email"],
    });
    res.redirect(authUrl);
});
exports.googleAuth = googleAuth;
const googleCallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    try {
        if (!code) {
            return res.status(400).send("Missing authorization code");
        }
        const { tokens } = yield client.getToken(code);
        client.setCredentials(tokens);
        const ticket = yield client.verifyIdToken({
            idToken: tokens.id_token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload) {
            return res.status(400).send("Invalid token payload");
        }
        const { sub: googleId, email, name } = payload;
        console.log(googleId, email, name);
        let user = yield User_1.default.findOne({ where: { email } });
        console.log(user, 'saurabh  --------------------------------------------');
        if (!user) {
            try {
                user = yield User_1.default.create({
                    googleId,
                    email,
                    name,
                    isVerified: true,
                });
            }
            catch (error) {
                if (error.name === "SequelizeUniqueConstraintError") {
                    user = yield User_1.default.findOne({ where: { email } });
                }
                else {
                    throw error;
                }
            }
        }
        const jwtToken = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
            name: user.name,
        }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.redirect(`http://localhost:5173/success?token=${jwtToken}`);
    }
    catch (error) {
        console.error("Error authenticating", error);
        res.status(500).send("Authentication failed");
    }
});
exports.googleCallback = googleCallback;
//# sourceMappingURL=googleAuthController.js.map