import { Request, Response } from "express";
import { hash } from "bcrypt";
import User from "../models/User"; 
import Password from '../models/password';
import { decrypt, encrypt } from "../utils/crypto";




export const savePassword = async (req: Request, res: Response) => {
  const { url, password } = req.body;
  const userId:number =  req.user?.id

  if (!url || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
  
const {iv,key,encryptedData} = encrypt(password);

    // Save the password
    const newPassword = await Password.create({
      url,
      iv,
      key,
      password: encryptedData,


      userId,
    });

    res.status(201).json(newPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const getPasswords = async (req: Request, res: Response) => {
  const userId:number =  req.user?.id

  try {
    const passwords = await Password.findAll({
      where: { userId:1 },
    });

   
    const decryptedPasswords = passwords.map(element=> ({
      ...element.toJSON(),
      password: decrypt(element.password,element.key,element.iv),
    }));

    res.status(200).json(decryptedPasswords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};





export const updatePassword = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { password } = req.body;
  const userId:number =  req.user?.id

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
   
    const existingPassword = await Password.findOne({
      where: { id, userId },
    });

    if (!existingPassword) {
      return res.status(404).json({ message: "Password entry not found" });
    }


    const { iv, key, encryptedData } = encrypt(password);


    existingPassword.iv = iv;
    existingPassword.key = key;
    existingPassword.password = encryptedData;

    await existingPassword.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Delete password

export const deletePassword = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id; 
  try {

    const existingPassword = await Password.findOne({
      where: { id, userId },
    });

    if (!existingPassword) {
      return res.status(404).json({ message: "Password entry not found" });
    }

    await existingPassword.destroy();

    res.status(200).json({ message: "Password deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
