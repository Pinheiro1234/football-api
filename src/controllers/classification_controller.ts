import { NextFunction, Request, Response } from "express";

export default class ClassificationController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    return res.status(204);
  }
}
