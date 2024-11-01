import { Router } from "express";
import ClassificationController from "../controllers/classification_controller";

const classificationRouter = Router();
const classificationController = new ClassificationController();

classificationRouter.get("/classifications", classificationController.getAll);

export { classificationRouter };
