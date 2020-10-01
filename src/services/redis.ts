import { REDIS_CACHE_KEY } from "../config";
import { HINCRBY_ASYNC, HGETALL_ASYNC } from "../modules/redisClient";

const incrementViews = async (tvId): Promise<void> => {
  await HINCRBY_ASYNC(REDIS_CACHE_KEY, tvId, 1);
};

interface IViews {
  [key: string]: number;
}

const getTopViews = async () => {
  const views: IViews = (await HGETALL_ASYNC(REDIS_CACHE_KEY)) || {};

  return Object.entries(views)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
};

export default {
  incrementViews,
  getTopViews,
};
