import { Request, Response } from "express";
import { prisma } from "../config/db.ts";

import bcrypt from "bcrypt";

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExists) {
      return res.status(400).json({ message: "User already Exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
        data:{
            name,
            email,
            password:hashedPassword
        }
    })
    return res.status(201).json({
        status:"success",
        message:"User registered successfully",
        user:{
            id:user.id,
            name:name,
            email:email,
            createdAt:user.createdAt,
        }
    })
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const login = async (req:Request, res : Response)=>{

    const {email , password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:"Please provide all required fields"});
    }

    const user = await prisma.user.findUnique({
        where:{
            email:email
        }
    })
    if(!user){
        return res.status(401).json({message:"Invalid Email or Password"});
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        return res.status(401).json({message:"Invalid Email or Password"});
    }

    return res.status(200).json({
        status:'success',
        message:"User logged in successfully",
        user:{
            id:user.id,
            email:email
        }
    })


}

export { register, login}