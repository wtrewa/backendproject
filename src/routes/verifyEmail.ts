import { Router,Request,Response } from "express";
import { sendVerificationCode } from "../controllers/emailController";

const emailRoute = Router();

emailRoute.post("/send-verification-code", sendVerificationCode);



export default emailRoute
