"use strict";
// utils/crypto.js
const crypto = require('crypto');
// Replace these with your own keys/algorithm
const algorithm = 'aes-256-cbc';
const key = Buffer.from('your-encryption-key-here', 'hex');
const iv = Buffer.from('your-initialization-vector-here', 'hex');
function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}
function decrypt(text) {
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
module.exports = { encrypt, decrypt };
//# sourceMappingURL=decrypt.js.map