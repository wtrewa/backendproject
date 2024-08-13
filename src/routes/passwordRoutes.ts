import { Router } from "express";
import {  deletePassword, getPasswords, savePassword, updatePassword } from "../controllers/passwordController";
import { authenticateToken } from "../middleware/authMiddleware";



const passwordRoute = Router();


passwordRoute.post("/password",authenticateToken, savePassword);
passwordRoute.get("/passwords",authenticateToken, getPasswords);
passwordRoute.patch("/passwords/:id", authenticateToken, updatePassword);
passwordRoute.delete("/passwords/:id", authenticateToken, deletePassword);

export default passwordRoute;
