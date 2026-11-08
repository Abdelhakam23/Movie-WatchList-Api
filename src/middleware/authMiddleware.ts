import jwt from "jsonwebtoken";
import {Request,Response,NextFunction} from "express";
import {prisma} from "../config/db.ts"

interface AuthRequest extends Request{
    user?: any;
}

export const authMiddleware = async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
        }
        else if (req.cookies?.jwt){
            token = req.cookies.jwt;
        }

        if(!token){
            return res.status(401).json({Error:"Not authorized, no token provided"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET || "") as {id:string};
        const user = await prisma.user.findUnique({
            where:{
                id:decoded.id,
            }
        })

        if(!user){
            return res.status(401).json({Error:"Not authorized, user not found"})
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({Error:"Not authorized, token failed"})
    }
}