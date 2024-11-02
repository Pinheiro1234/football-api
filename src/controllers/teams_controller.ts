import { NextFunction, Request, Response } from "express";
import { TeamsService } from "./../services/teams_service";

export class TeamsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    const service = new TeamsService();
    let teams = await service.getAll();

    return res.status(200).json(teams).end();
  }

  async getAllClassification(req: Request, res: Response, next: NextFunction) {
    const service = new TeamsService();
    let teams = await service.getAllClassification();

    return res.status(200).json(teams).end();
  }
}
