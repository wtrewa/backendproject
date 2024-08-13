"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
const crypto_1 = __importDefault(require("crypto"));
// Encryption function
const encrypt = (text) => {
    const algorithm = 'aes-256-cbc';
    const key = crypto_1.default.randomBytes(32);
    const iv = crypto_1.default.randomBytes(16);
    const cipher = crypto_1.default.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return {
        iv: iv.toString('hex'),
        key: key.toString('hex'),
        encryptedData: encrypted
    };
};
exports.encrypt = encrypt;
const decrypt = (encryptedData, keyHex, ivHex) => {
    const algorithm = 'aes-256-cbc';
    const key = Buffer.from(keyHex, 'hex');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto_1.default.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
exports.decrypt = decrypt;
const { iv, key, encryptedData } = (0, exports.encrypt)("Welcome to Tutorials Point...");
console.log(encryptedData);
console.log((0, exports.decrypt)(encryptedData, key, iv));
//# sourceMappingURL=crypto.js.map