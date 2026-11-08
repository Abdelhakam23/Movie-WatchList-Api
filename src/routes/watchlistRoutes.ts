import express from "express";
import { addToWatchList } from "../controller/watchlistController";

const router = express.Router();

router.post('/add',addToWatchList);

export default router;