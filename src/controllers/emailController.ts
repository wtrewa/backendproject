import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import validator from "validator";
import nodemailer from "nodemailer";
import { createCustomError } from "../helpers/errorHandler";


interface SendVerificationCodeRequestBody {
  email: string;
}

export const sendVerificationCode = async (
  req: Request<{}, {}, SendVerificationCodeRequestBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;
  console.log(email)

 
  if (!email) {
    return next(createCustomError(400, "Email is required"));
  }

 
  const verificationCode = crypto.randomInt(100000, 999999).toString();

  try {

    if (!validator.isEmail(email)) {
      return next(createCustomError(400, "Invalid email format"));
    }


    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });


    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Email Verification",
      text: `Your verification code is: ${verificationCode}`,
    };


    await transporter.sendMail(mailOptions);

  
    res
      .status(200)
      .json({ message: "Verification code sent", code: verificationCode });
  } catch (error) {
    console.error("Error sending verification code:", error);
    next(createCustomError(500, "Failed to send verification email"));
  }
};
