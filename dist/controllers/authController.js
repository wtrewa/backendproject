"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getProfile = exports.login = exports.registerUser = void 0;
const validator_1 = __importDefault(require("validator"));
const errorHandler_1 = require("../helpers/errorHandler");
const bcrypt = __importStar(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, } = req.body;
    if (!email || !password) {
        return next((0, errorHandler_1.createCustomError)(400, "Email and password are required"));
    }
    if (!validator_1.default.isEmail(email)) {
        next((0, errorHandler_1.createCustomError)(400, "Invalid email format"));
    }
    if (!validator_1.default.isStrongPassword(password)) {
        next((0, errorHandler_1.createCustomError)(400, "Password must be at least 8 characters long and include at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol."));
    }
    const existingUser = yield User_1.default.findOne({ where: { email } });
    if (existingUser) {
        next((0, errorHandler_1.createCustomError)(400, "Email is already in use"));
    }
    const hashPassword = yield bcrypt.hash(password, 10);
    //creattion of new user
    const newUser = yield User_1.default.create({
        email,
        name,
        password: hashPassword,
        isVerified: true,
    });
    //response
    res.status(200).send({
        id: newUser.id,
        email: newUser.email,
        isVerified: newUser.isVerified,
    });
});
exports.registerUser = registerUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const user = yield User_1.default.findOne({ where: { email } });
        console.log(user);
        if (!user) {
            return res.status(400).json({ message: "User has not found" });
        }
        const isPasswordValid = yield bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Incorrect Password " });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.login = login;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userProfile = {
        name: req.user.name,
        email: req.user.email,
    };
    res.json(userProfile);
});
exports.getProfile = getProfile;
//# sourceMappingURL=authController.js.map