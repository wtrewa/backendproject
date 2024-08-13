import { NextFunction, Request, Response } from "express";
import validator from "validator";
import { createCustomError } from "../helpers/errorHandler";
import * as bcrypt from "bcrypt";
import User from "../models/User";
import jwt from 'jsonwebtoken'

type RequestBodyType={
  email:string,
  password:string,
  name:string,
}
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password,name, }:RequestBodyType = req.body;
  if (!email || !password) {
    return next(createCustomError(400, "Email and password are required"));
  }
  if (!validator.isEmail(email)) {
    next(createCustomError(400, "Invalid email format"));
  }
  if (!validator.isStrongPassword(password)) {
    next(
      createCustomError(
        400,
        "Password must be at least 8 characters long and include at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol."
      )
    );
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    next(createCustomError(400, "Email is already in use"));
  }

  

  const hashPassword = await bcrypt.hash(password, 10);

  //creattion of new user
  const newUser = await User.create({
    email,
    name,
    password: hashPassword,
    isVerified:true,
   
  });

  //response
  res.status(200).send({
    id: newUser.id,
    email: newUser.email,
    isVerified: newUser.isVerified,
  });
};



export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
   
    console.log(email,password)
  
    const user:any = await User.findOne({ where: { email } });
   
    console.log(user)

    if (!user) {
      return res.status(400).json({ message: "User has not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect Password " });
    }


    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token });
  
  } catch (error) {
    
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProfile = async(req:Request,res:Response)=>{
  const userProfile = {
    name: req.user.name,
    email: req.user.email,

  };

  res.json(userProfile);
}

