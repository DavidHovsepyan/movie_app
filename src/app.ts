import express from "express";
import { PORT } from "./config";

import analyticsRouter from "./resources/analytics/router";
import topEpisodesRouter from "./resources/topEpisodes/router";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.get("/health", (req, res) => {
  res.status(200);
});

app.use("/topEpisodes", topEpisodesRouter);
app.use("/analytics", analyticsRouter);

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
