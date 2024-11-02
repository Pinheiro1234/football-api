import { Router } from "express";
import { TeamsController } from "../controllers/teams_controller";

const teamsRouter = Router();
const teamsController = new TeamsController();

teamsRouter
  .get("/teams", teamsController.getAll)
  .get("/teams/:id", teamsController.getById)
  .get("/teams/classification", teamsController.getAllClassification);

export { teamsRouter };
