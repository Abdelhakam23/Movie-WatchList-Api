import express from "express";
import { addToWatchList, deleteItemFromWatchList, deleteWatchList, getWatchList } from "../controller/watchlistController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.use(authMiddleware);

router.get('/',getWatchList)
router.post('/',addToWatchList);

router.delete('/:id',deleteItemFromWatchList)
router.delete('/',deleteWatchList)



export default router;