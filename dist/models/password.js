"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../config/connection")); // Adjust the path as needed
class Password extends sequelize_1.Model {
}
Password.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    url: {
        type: sequelize_1.DataTypes.STRING(1000),
        allowNull: false,
    },
    iv: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    key: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: "users",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },
}, {
    sequelize: connection_1.default,
    modelName: "Password",
});
exports.default = Password;
//# sourceMappingURL=password.js.map