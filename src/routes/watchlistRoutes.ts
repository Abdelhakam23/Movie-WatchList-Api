import express from "express";
import { addToWatchList, deleteItemFromWatchList, deleteWatchList, getWatchList, updateItemInWatchList } from "../controller/watchlistController";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateRequest } from "../middleware/validateRequest";
import { addToWatchlistSchema, updateWatchlistSchema } from "../validators/watchlistValidators";

const router = express.Router();

router.use(authMiddleware);

router.get('/',getWatchList)
router.post('/',validateRequest(addToWatchlistSchema) ,addToWatchList);
router.put('/:id',validateRequest(updateWatchlistSchema),updateItemInWatchList)
router.delete('/:id',deleteItemFromWatchList)
router.delete('/',deleteWatchList)



export default router;