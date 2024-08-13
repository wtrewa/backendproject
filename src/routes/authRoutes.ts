
import { Request, Response, Router } from "express";
import { getProfile, login, registerUser } from "../controllers/authController";
import { authenticateToken } from "../middleware/authMiddleware";

const authRoute = Router();

authRoute.post("/signup", registerUser);
authRoute.post("/login", login);
authRoute.get("/user",authenticateToken,getProfile)

export default authRoute;
