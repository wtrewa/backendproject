import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401); 
  }
  console.log('middleware',token)

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) {
      return res.sendStatus(403); 
    }
    console.log(user)
    req.user = user; 
    next();
  });
};
