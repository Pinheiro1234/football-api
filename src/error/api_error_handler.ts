import { NextFunction, Request, Response } from "express";
import { ApiError } from "./api_error";

export function apiErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  if (err instanceof ApiError) {
    res.status(err.code).json(err);
    return;
  }

  res.status(500).json("Ocorreu um erro inesperado");
}
