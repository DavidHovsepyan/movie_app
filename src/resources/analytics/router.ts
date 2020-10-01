import { Router } from "express";
import { getPopularSeries } from "./controller";

const router = Router();

router.route("/popularSeries").get(getPopularSeries);

export default router;
