import { Request, Response } from "express";

export const notFoundMiddleware = (
  req: Request,
  res: Response,
): Response<any, Record<string, any>> =>
  res.status(404).send("Route does not exist");
