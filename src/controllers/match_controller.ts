import { NextFunction, Request, Response } from "express";
import { ApiError } from "../error/api_error";
import { MatchService } from "../services/match_service";

export class MatchController {
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
    const service = new MatchService();
    let matches = await service.getAll();

    res.status(200).json(matches);
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    if (!id) {
      return next(ApiError.badRequest());
    }

    try {
      const service = new MatchService();
      let match = await service.getById(Number(id));

      res.status(200).json(match);
    } catch (error) {
      if (error instanceof ApiError) {
        return next(error);
      } else {
        return next(ApiError.internal());
      }
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const {
      dateId,
      roundId,
      teamHomeId,
      teamVisitId,
      teamHomeGoals,
      teamVisitGoals,
    } = req.body;

    if (!id || !dateId || !roundId || !teamHomeId || !teamVisitId) {
      return next(ApiError.badRequest());
    }

    try {
      const service = new MatchService();

      var result = await service.update({
        id: Number(id),
        dateId,
        roundId,
        teamHomeId,
        teamHomeGoals,
        teamVisitId,
        teamVisitGoals,
      });

      res.status(201).json(result).end();
    } catch (error) {
      if (error instanceof ApiError) {
        return next(error);
      } else {
        return next(ApiError.internal());
      }
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    if (!id) {
      return next(ApiError.badRequest());
    }

    try {
      const service = new MatchService();
      const result = await service.delete(Number(id));

      res.status(200).json(result);
    } catch (error) {
      if (error instanceof ApiError) {
        return next(error);
      } else {
        return next(ApiError.internal());
      }
    }
  }
}
