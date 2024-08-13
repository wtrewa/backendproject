"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../config/connection"));
const User_1 = __importDefault(require("./User"));
const password_1 = __importDefault(require("./password"));
const db = {
    User: User_1.default,
    Password: password_1.default,
    sequelize: connection_1.default,
};
exports.default = db;
//# sourceMappingURL=index.js.map