import express from "express";
import passport from "passport";
import { googleAuth, googleCallback } from "../controllers/googleAuthController";

const googleAuthRoute = express.Router();



googleAuthRoute.get("/google", googleAuth);

googleAuthRoute.get("/google/callback", googleCallback);




export default googleAuthRoute;

