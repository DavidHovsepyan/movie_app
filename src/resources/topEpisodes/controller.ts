import { Request, Response, NextFunction } from "express";
import redisService from "../../services/redis";
import episodesService from '../../services/episodes'
import { generateTvSeriesUrl } from "../../utils/url";

export const getTopEpisodes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { seriesId: tvId } = req.params;
    const tvSeriesUrl = generateTvSeriesUrl(tvId);
    await redisService.incrementViews(tvId);

    const tvSeries = await episodesService.getTvSeries(tvSeriesUrl);
    const seasonNumbers = tvSeries.data.seasons.map(
      (season) => season.season_number
    );

    const episodes = await episodesService.getSortedTopEpisodes(seasonNumbers, tvId);

    res.status(200).json(episodes);
  } catch (err) {
    next(err)
  }
};
