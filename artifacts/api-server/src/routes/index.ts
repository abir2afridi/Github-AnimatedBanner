import { Router, type IRouter } from "express";
import healthRouter from "./health";
import bannerRouter from "./banner";

const router: IRouter = Router();

router.use(healthRouter);
router.use(bannerRouter);

export default router;
