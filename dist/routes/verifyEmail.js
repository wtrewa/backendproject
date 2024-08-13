"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emailController_1 = require("../controllers/emailController");
const emailRoute = (0, express_1.Router)();
emailRoute.post("/send-verification-code", emailController_1.sendVerificationCode);
exports.default = emailRoute;
//# sourceMappingURL=verifyEmail.js.map