import { NextFunction, Request, Response } from "express";
import { DatesService } from "../services/dates_service";

export class DatesController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    const service = new DatesService();

    const dates = await service.getAll();

    return res.status(200).json(dates).end();
  }
}
