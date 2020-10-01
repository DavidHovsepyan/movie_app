import { Router } from "express";
import { getTopEpisodes } from "./controller";

const router = Router();

router.route("/:seriesId").get(getTopEpisodes);

export default router;
