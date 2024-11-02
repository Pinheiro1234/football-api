import { Router } from "express";
import { StatisticsController } from "../controllers/statistics_controller";

const statisticsRouter = Router();
const statisticsController = new StatisticsController();

statisticsRouter.get(
  "/statistics/:teamId",
  statisticsController.getTeamStatistics
);

export { statisticsRouter };
