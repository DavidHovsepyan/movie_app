import { Request, Response, NextFunction } from "express";
import redisService from "../../services/redis";

export const getPopularSeries = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const series = await redisService.getTopViews();
    return res.status(200).json({
      series,
    });
  } catch (err) {
    next(err);
  }
};
