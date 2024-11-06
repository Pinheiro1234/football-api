import { NextFunction, Request, Response } from "express";
import { RoundsService } from "../services/rounds_service";
import { ApiError } from "../error/api_error";

export class RoundsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    const service = new RoundsService();
    const rounds = await service.getAll();

    return res.status(200).json(rounds).end();
  }

  async getMatchesByRoundId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    if (!id) {
      throw ApiError.badRequest();
    }

    const service = new RoundsService();
    const rounds = await service.getMatchesByRoundId(Number(id));

    return res.status(200).json(rounds).end();
  }
}
