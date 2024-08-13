"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passwordController_1 = require("../controllers/passwordController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const passwordRoute = (0, express_1.Router)();
passwordRoute.post("/password", authMiddleware_1.authenticateToken, passwordController_1.savePassword);
passwordRoute.get("/passwords", authMiddleware_1.authenticateToken, passwordController_1.getPasswords);
passwordRoute.patch("/passwords/:id", authMiddleware_1.authenticateToken, passwordController_1.updatePassword);
passwordRoute.delete("/passwords/:id", authMiddleware_1.authenticateToken, passwordController_1.deletePassword);
exports.default = passwordRoute;
//# sourceMappingURL=passwordRoutes.js.map