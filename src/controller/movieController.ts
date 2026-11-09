import { Request, Response } from "express";
import {prisma} from "../config/db.ts"



const getAllMovies = async(req:Request,res:Response)=>{
    try {
        const movies  = await prisma.movie.findMany()
        return res.status(200).json({
            status:"Success",
            message:"Movies fetched successfully",
            results:movies.length,
            data:movies
        })
        
    } catch (error) {
        return res.status(500).json({Error:"Internal Server Error"})
    }

}

const getMovieById = async(req:Request,res:Response)=>{
    try {
        const {id} = req.params;
        const movie = await prisma.movie.findUnique({
            where:{
                id:id as string
            }
        })

        if(!movie){
            return res.status(404).json({Error:"Movie not found"})
        }

        return res.status(200).json({
            status:"Success",
            message:"Movie fetched successfully",
            data:movie
        })

    } catch (error) {
        return res.status(500).json({Error:"Internal Server Error"})
    }
}

export {getAllMovies, getMovieById}