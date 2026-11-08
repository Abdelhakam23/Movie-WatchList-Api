import { Request, Response } from "express";
import {prisma} from '../config/db.ts'


const addToWatchList = async(req: Request, res: Response) => {
try {
    
    const {movieId,userId,status,rating} = req.body;

    const isExistingMovie = await prisma.movie.findUnique({
        where:{
        id:movieId
        }
    })

    if(!isExistingMovie){
        return res.status(404).json({Error:"Movie Not Found"})
    }

    const isAddedToWatchList = await prisma.watchListItem.findUnique({
        where:{
            userId_movieId:{
                userId:userId,
                movieId:movieId
            }
        }
    })

    if(isAddedToWatchList){
        return res.status(400).json({Error:"Movie already added to watchlist"});
    }

    const watchListItem = await prisma.watchListItem.create({
        data:{
            userId,
            movieId,
            status:status||"PLANNED",
            rating,
            
        }
    })

    return res.status(201).json({
        status:'Success',
        message:'Movie added to watchlist successfully',
        data:watchListItem
    })
} catch (error) {

    return res.status(500).json({Error:"Internal Server Error"})
    
}
}

export {addToWatchList}