import { NextFunction, Request, Response } from "express";
import { TeamsService } from "./../services/teams_service";

export default class TeamsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    const service = new TeamsService();
    let teams = await service.getAll();

    return res.status(200).json(teams).end();
  }
}
