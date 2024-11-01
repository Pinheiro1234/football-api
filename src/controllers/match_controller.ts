import { NextFunction, Request, Response } from "express";
import { ApiError } from "../error/api_error";
import { MatchService } from "../services/match_service";

export default class MatchController {
  async add(req: Request, res: Response, next: NextFunction) {
    const {
      dateId,
      roundId,
      teamHomeId,
      teamVisitId,
      teamHomeGoals,
      teamVisitGoals,
    } = req.body;

    if (!dateId || !roundId || !teamHomeId || !teamVisitId) {
      return next(ApiError.badRequest());
    }

    const service = new MatchService();

    var result = await service.add({
      dateId,
      roundId,
      teamHomeId,
      teamHomeGoals,
      teamVisitId,
      teamVisitGoals,
    });

    res.status(201).json(result).end();
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    const { teamId } = req.body;

    res.status(200).json({
      Mensagem: "Sucesso",
    });
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { date, matchNumber, homeId, visitId, homeGols, visitGols } =
      req.body;
    const { id } = req.params;

    if (!id || !date || !matchNumber || !homeId || !visitId) {
      return next(ApiError.badRequest());
    }
    res.status(201).json({
      date: date,
      matchNumber: matchNumber,
      homeId: homeId,
      visitId: visitId,
      homeGols: homeGols ?? null,
      visitGols: visitGols ?? null,
    });

    res.status(200).json({
      Mensagem: "Sucesso",
    });
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    if (!id) {
      return next(ApiError.badRequest());
    }
    res.status(200).json({
      Mensagem: `Deletado: ${id}`,
    });
  }
}
