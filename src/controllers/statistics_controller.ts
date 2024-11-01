import { NextFunction, Request, Response } from "express";

export default class StatisticsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    const { type: StatisticsType } = req.body;

    return res.status(204);
  }
}
