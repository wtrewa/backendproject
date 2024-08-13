"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require("dotenv/config");
const dbname = process.env.DB_NAME
    ? process.env.DB_NAME
    : null;
const username = process.env.DB_USER
    ? process.env.DB_USER
    : null;
const password = process.env.DB_PASSWORD
    ? process.env.DB_PASSWORD
    : null;
console.log(dbname, username, password, process.env.DB_NAME);
const sequelize = new sequelize_1.Sequelize(dbname, "root", process.env.DB_PASSWORD, {
    host: "localhost",
    dialect: "mysql",
});
exports.default = sequelize;
//# sourceMappingURL=connection.js.map