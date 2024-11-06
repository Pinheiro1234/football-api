import { Router } from "express";
import { RoundsController } from "../controllers/rounds_controller";

const roundsRouter = Router();
const roundsController = new RoundsController();

roundsRouter
    .get("/rounds", roundsController.getAll)
    .get("/rounds/:id/matches", roundsController.getMatchesByRoundId);

export { roundsRouter };
