import { NextFunction, Request, Response } from "express";
import { ApiError } from "../error/api_error";
import { TeamsService } from "./../services/teams_service";

export class TeamsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    const service = new TeamsService();
    let teams = await service.getAll();

    return res.status(200).json(teams).end();
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const service = new TeamsService();
      let teams = await service.getById(Number(id));

      return res.status(200).json(teams).end();
    } catch (error) {
      if (error instanceof ApiError) {
        return next(error);
      } else {
        return next(ApiError.internal());
      }
    }
  }

  async getAllClassification(req: Request, res: Response, next: NextFunction) {
    const service = new TeamsService();
    let classifications = await service.getAllClassification();

    return res.status(200).json(classifications).end();
  }

  async getClassificationById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    if(!id) {
      throw ApiError.badRequest();
    }

    const service = new TeamsService();
    let classification = await service.getClassificationById(Number(id));

    return res.status(200).json(classification).end();
  }
}
