import { Request, Response } from "express";
import { prisma } from "../config/db.ts";
interface AuthRequest extends Request {
  user?: any;
}



const addToWatchList = async (req: AuthRequest, res: Response) => {
  try {
    const { movieId, status, rating, notes } = req.body;

    const isExistingMovie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!isExistingMovie) {
      return res.status(404).json({ Error: "Movie Not Found" });
    }

    const isAddedToWatchList = await prisma.watchListItem.findUnique({
      where: {
        userId_movieId: {
          userId: req.user.id,
          movieId: movieId,
        },
      },
    });

    if (isAddedToWatchList) {
      return res
        .status(400)
        .json({ Error: "Movie already added to watchlist" });
    }

    const watchListItem = await prisma.watchListItem.create({
      data: {
        userId: req.user.id,
        movieId,
        status: status || "PLANNED",
        rating,
        notes,
      },
    });

    return res.status(201).json({
      status: "Success",
      message: "Movie added to watchlist successfully",
      data: watchListItem,
    });
  } catch (error) {
    return res.status(500).json({ Error: "Internal Server Error" });
  }
};

const deleteItemFromWatchList = async (req: AuthRequest, res: Response) => {
  try {
    const watchListItem = await prisma.watchListItem.findUnique({
      where: {
        id: req.params.id as string,
      },
    });

    if (!watchListItem) {
      return res.status(404).json({ Error: "Watchlist item not found" });
    }

    if (watchListItem.userId !== req.user.id) {
      return res
        .status(403)
        .json({ Error: "You are not authorized to delete this item" });
    }

    await prisma.watchListItem.delete({
      where: {
        id: req.params.id as string,
      },
    });

    return res.status(200).json({
      status: "Success",
      message: "Watchlist item deleted successfully",
      data: watchListItem,
    });
  } catch (error) {
    return res.status(500).json({ Error: "Internal Server Error" });
  }
};

const deleteWatchList = async (req: AuthRequest, res: Response) => {
  try {
    const watchList = await prisma.watchListItem.findMany({
      where: {
        userId: req.user.id,
      },
    });

    if (watchList.length === 0) {
      return res.status(404).json({ Error: "Watchlist is empty" });
    }
    await prisma.watchListItem.deleteMany({
      where: {
        userId: req.user.id,
      },
    });

    return res.status(200).json({
      status: "Success",
      message: "Watchlist deleted successfully",
      data: watchList,
    });
  } catch (error) {
    return res.status(500).json({ Error: "Internal Server Error" });
  }
};

const getWatchList = async (req: AuthRequest, res: Response) => {
  try {
    const watchList = await prisma.watchListItem.findMany({
      where: {
        userId: req.user.id,
      },
    });

    if (watchList.length === 0) {
      return res.status(404).json({ Error: "Watchlist is empty" });
    }

    return res.status(200).json({
      status: "success",
      message: "Watchlist fetched successfully",
      data: watchList,
    });
  } catch (error) {
    return res.status(500).json({ Error: "Internal Server Error" });
  }
};

const updateItemInWatchList = async (req: AuthRequest, res: Response) => {
  try {
    const { status, rating, notes } = req.body;

    const watchListItem = await prisma.watchListItem.findUnique({
      where: {
        id: req.params.id as string,
      },
    });

    if (!watchListItem) {
      return res.status(404).json({ Error: "Watchlist item not found" });
    }

    if (watchListItem.userId !== req.user.id) {
      return res
        .status(403)
        .json({ Error: "You are not authorized to update this item" });
    }

    const updatedWatchListItem = await prisma.watchListItem.update({
      where: {
        id: req.params.id as string,
      },
      data: {
        status,
        rating,
        notes,
      },
    });

    return res.status(200).json({
      status: "Success",
      message: "Watchlist item updated successfully",
      data: updatedWatchListItem,
    });
  } catch (error) {
    return res.status(500).json({ Error: "Internal Server Error" });
  }
};

export {
  addToWatchList,
  deleteItemFromWatchList,
  deleteWatchList,
  getWatchList,
  updateItemInWatchList,
};
