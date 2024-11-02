import { NextFunction, Request, Response } from "express";
import { RoundsService } from "../services/rounds_service";

export class RoundsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    const service = new RoundsService();
    const rounds = await service.getAll();

    return res.status(200).json(rounds).end();
  }
}
