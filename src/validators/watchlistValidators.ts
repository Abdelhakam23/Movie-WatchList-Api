import {z} from "zod";

const addToWatchlistSchema = z.object({
    movieId:z.string().uuid(),
    status:z.enum(["PLANNED","WATCHING","COMPLETED"],{
        error:()=>({
            message:"Invalid status value. Must be one of: PLANNED, WATCHING, COMPLETED"
        })
    }).optional(),
    rating:z.coerce.number().int("Rating must be an integer").min(1,"Rating must be at least 1").max(10,"Rating cannot exceed 10").optional(),
    notes:z.string().optional()
})


const updateWatchlistSchema = z.object({
    status:z.enum(["PLANNED","WATCHING","COMPLETED"],{
        error:()=>{
            message:"Invalid status value. Must be one of: PLANNED, WATCHING, COMPLETED"
        }
    }).optional(),
    rating:z.coerce.number().int("Rating must be an integer").min(1,"Rating must be at least 1").max(10,"Rating cannot exceed 10").optional(),
    notes:z.string().optional()
})



export {addToWatchlistSchema , updateWatchlistSchema}