import { Request, Response } from "express";
import User from "../models/User";
import jwt from 'jsonwebtoken'
const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:8080/auth/google/callback";


const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

export const googleAuth = async (req: Request, res: Response) => {
  const authUrl = client.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email"],
  });
  res.redirect(authUrl);
};


export const googleCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string;
  try {
    if (!code) {
      return res.status(400).send("Missing authorization code");
    }

    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).send("Invalid token payload");
    }

    const { sub: googleId, email, name } = payload;
    console.log(googleId,email,name)

    let user = await User.findOne({ where: { email } });
    console.log(user,'saurabh  --------------------------------------------')
    
    if (!user) {
      
      try {
        user = await User.create({
          googleId,
          email,
          name,
          isVerified: true,
        });
      } catch (error) {
      
        if (error.name === "SequelizeUniqueConstraintError") {
          user = await User.findOne({ where: { email } });
        } else {
          throw error;
        }
      }
    }

   
    const jwtToken =  jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );


    res.redirect(`http://localhost:5173/success?token=${jwtToken}`);
  } catch (error) {
    console.error("Error authenticating", error);
    res.status(500).send("Authentication failed");
  }
};
