import express from "express"
import { getAllMovies, getMovieById } from "../controller/movieController";

 const router  = express.Router();

router.get('/',getAllMovies)
router.get('/:id',getMovieById)



export default router;