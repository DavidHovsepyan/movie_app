import redis from "redis";
import { promisify } from "util";

export const REDIS_CACHE_KEY = "views";

const client = redis.createClient({
  host: "redis",
  port: 6379,
});

client.on("error", function (err) {
  console.log("Redis error encountered", err);
});

client.on("end", function () {
  console.log("Redis connection closed");
});

export const HINCRBY_ASYNC = promisify(client.hincrby).bind(client);
export const HGETALL_ASYNC = promisify(client.hgetall).bind(client);
