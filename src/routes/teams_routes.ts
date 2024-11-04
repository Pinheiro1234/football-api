import { Router } from "express";
import { TeamsController } from "../controllers/teams_controller";

const teamsRouter = Router();
const teamsController = new TeamsController();

teamsRouter
  .get("/teams/classification", teamsController.getAllClassification)
  .get("/teams", teamsController.getAll)
  .get("/teams/:id", teamsController.getById);

export { teamsRouter };
