import crypto from 'crypto';

// Encryption function
export const encrypt = (text) => {
    const algorithm = 'aes-256-cbc';
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return {
        iv: iv.toString('hex'),
        key: key.toString('hex'),
        encryptedData: encrypted
    };
};


export const decrypt = (encryptedData:any, keyHex:any, ivHex:any) => {
    const algorithm = 'aes-256-cbc';
    const key = Buffer.from(keyHex, 'hex');
    const iv = Buffer.from(ivHex, 'hex');

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
};


const { iv, key, encryptedData } = encrypt("Welcome to Tutorials Point...");
console.log(encryptedData);
console.log(decrypt(encryptedData, key, iv));
