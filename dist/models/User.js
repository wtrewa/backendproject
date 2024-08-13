"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../config/connection")); // Adjust the path as needed
class User extends sequelize_1.Model {
    // Association with Passwords
    static associate(models) {
        User.hasMany(models.Password, {
            foreignKey: "userId",
            as: "passwords",
            onDelete: "CASCADE", // This will delete all associated passwords when a user is deleted
        });
    }
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    googleId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    isVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    indexes: [
        {
            unique: true,
            fields: ["email", "googleId"],
        },
    ],
    sequelize: connection_1.default,
    modelName: "User",
    tableName: "users",
    timestamps: true,
});
exports.default = User;
//# sourceMappingURL=User.js.map