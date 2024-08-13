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
exports.deletePassword = exports.updatePassword = exports.getPasswords = exports.savePassword = void 0;
const password_1 = __importDefault(require("../models/password"));
const crypto_1 = require("../utils/crypto");
const savePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { url, password } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!url || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const { iv, key, encryptedData } = (0, crypto_1.encrypt)(password);
        // Save the password
        const newPassword = yield password_1.default.create({
            url,
            iv,
            key,
            password: encryptedData,
            userId,
        });
        res.status(201).json(newPassword);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.savePassword = savePassword;
const getPasswords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const passwords = yield password_1.default.findAll({
            where: { userId: 1 },
        });
        const decryptedPasswords = passwords.map(element => (Object.assign(Object.assign({}, element.toJSON()), { password: (0, crypto_1.decrypt)(element.password, element.key, element.iv) })));
        res.status(200).json(decryptedPasswords);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getPasswords = getPasswords;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const { password } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }
    try {
        const existingPassword = yield password_1.default.findOne({
            where: { id, userId },
        });
        if (!existingPassword) {
            return res.status(404).json({ message: "Password entry not found" });
        }
        const { iv, key, encryptedData } = (0, crypto_1.encrypt)(password);
        existingPassword.iv = iv;
        existingPassword.key = key;
        existingPassword.password = encryptedData;
        yield existingPassword.save();
        res.status(200).json({ message: "Password updated successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updatePassword = updatePassword;
// Delete password
const deletePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const existingPassword = yield password_1.default.findOne({
            where: { id, userId },
        });
        if (!existingPassword) {
            return res.status(404).json({ message: "Password entry not found" });
        }
        yield existingPassword.destroy();
        res.status(200).json({ message: "Password deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deletePassword = deletePassword;
//# sourceMappingURL=passwordController.js.map