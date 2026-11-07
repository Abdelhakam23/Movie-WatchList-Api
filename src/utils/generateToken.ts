import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (userId:String, res:Response)=>{
    const payLoad = {id:userId};
   const token  = jwt.sign(payLoad,process.env.JWT_SECRET || "" , {
    expiresIn:process.env.EXPIRES_IN
   } as jwt.SignOptions);

   res.cookie("jwt",token,{
    httpOnly:true,
    secure:process.env.NODE_ENV === 'production',
    sameSite:'strict',
    maxAge:(1000*60 *60*24)*7
   })

   return token;

}