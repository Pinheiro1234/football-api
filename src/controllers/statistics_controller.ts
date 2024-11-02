import { NextFunction, Request, Response } from "express";
import { ApiError } from "../error/api_error";
import { StatisticsService } from "../services/statistics_service";

export class StatisticsController {
  async getTeamStatistics(req: Request, res: Response, next: NextFunction) {
    let { teamId } = req.params;

    console.log(teamId);

    if (!teamId) {
      return next(ApiError.badRequest());
    }

    const service = new StatisticsService();
    const statistics = await service.getTeamStatistics(Number(teamId));

    res.status(200).json(statistics).end();

    return res.status(204);
  }
}
