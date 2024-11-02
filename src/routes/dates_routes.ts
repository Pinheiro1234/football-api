import { Router } from "express";
import { DatesController } from "../controllers/dates_controller";

const datesRouter = Router();
const datesController = new DatesController();

datesRouter.get("/dates", datesController.getAll);

export { datesRouter };
