import express from "express";
import { addToWatchList, deleteItemFromWatchList, deleteWatchList, getWatchList, updateItemInWatchList } from "../controller/watchlistController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.use(authMiddleware);

router.get('/',getWatchList)
router.post('/',addToWatchList);
router.put('/:id',updateItemInWatchList)
router.delete('/:id',deleteItemFromWatchList)
router.delete('/',deleteWatchList)



export default router;