import axios from "axios";
import { generateTopEpisodesUrl } from "../utils/url";


type Season = {
  season_number: string;
  name: string;
}
interface ISeries {
  data: {
    seasons: Season[]
  }
}

const sortEpisodes = (episodes) => {
  return episodes
    .reduce((acc, cur) => [...acc, ...cur.data.episodes], [])
    .sort((a, b) => (a.vote_average > b.vote_average ? -1 : 1))
    .slice(0, 20);
};

const getTvSeries = async (tvSeriesUrl: string): Promise<ISeries> => {
  return axios.get(tvSeriesUrl);
};

const getSortedTopEpisodes = async (episodeIds: string[], tvId: string) => {
  const episodes = await Promise.all(
    episodeIds.map((episodeId) => {
      return axios.get(generateTopEpisodesUrl(episodeId, tvId));
    })
  );

  return sortEpisodes(episodes);
};

export default {
  sortEpisodes,
  getTvSeries,
  getSortedTopEpisodes,
};
