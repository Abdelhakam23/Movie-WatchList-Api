import express from "express";
import { addToWatchList } from "../controller/watchlistController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.use(authMiddleware);

router.post('/add',addToWatchList);

export default router;