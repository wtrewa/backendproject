"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomError = exports.errorHandler = void 0;
const sequelize_1 = require("sequelize");
class CustomError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }
    }
}
const errorHandler = (err, req, res, next) => {
    if (err instanceof sequelize_1.ValidationError) {
        return res.status(400).json({
            message: "Validation error",
            details: err.errors.map((error) => error.message),
        });
    }
    if (err instanceof CustomError) {
        return res.status(err.statusCode || 500).json({
            message: err.message || "Internal Server Error",
        });
    }
};
exports.errorHandler = errorHandler;
const createCustomError = (statusCode, message) => {
    return new CustomError(statusCode, message);
};
exports.createCustomError = createCustomError;
//# sourceMappingURL=errorHandler.js.map