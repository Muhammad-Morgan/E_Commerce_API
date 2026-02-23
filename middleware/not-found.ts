import { NextFunction, Request, Response } from "express";

export const notFoundMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): Response<any, Record<string, any>> =>
  res.status(404).send("Route does not exist");
