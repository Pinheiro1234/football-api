import { Router } from "express";
import { MatchController } from "../controllers/match_controller";

const matchRouter = Router();
const matchController = new MatchController();

matchRouter
  .get("/matches", matchController.getAll)
  .get("/matches/:id", matchController.getById)
  .post("/matches", matchController.add)
  .put("/matches/:id", matchController.update)
  .delete("/matches/:id", matchController.delete);

export { matchRouter };
