import { Router } from "express";
import { RoundsController } from "../controllers/rounds_controller";

const roundsRouter = Router();
const roundsController = new RoundsController();

roundsRouter.get("/rounds", roundsController.getAll);

export { roundsRouter };
