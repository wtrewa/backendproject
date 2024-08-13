"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const googleAuthController_1 = require("../controllers/googleAuthController");
const googleAuthRoute = express_1.default.Router();
googleAuthRoute.get("/google", googleAuthController_1.googleAuth);
googleAuthRoute.get("/google/callback", googleAuthController_1.googleCallback);
exports.default = googleAuthRoute;
//# sourceMappingURL=googleAuthRoutes.js.map