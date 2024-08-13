"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const authRoute = (0, express_1.Router)();
authRoute.post("/signup", authController_1.registerUser);
authRoute.post("/login", authController_1.login);
authRoute.get("/user", authMiddleware_1.authenticateToken, authController_1.getProfile);
exports.default = authRoute;
//# sourceMappingURL=authRoutes.js.map