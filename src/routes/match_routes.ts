import { Router } from "express";
import MatchController from "../controllers/match_controller";

const matchRouter = Router();
const matchController = new MatchController();

matchRouter
  .get("/matches", matchController.getAll)
  .post("/match", matchController.add)
  .put("/match/:id", matchController.update)
  .delete("/match/:id", matchController.delete);

export { matchRouter };
