import { NextFunction, Request, Response } from "express";
import { UnauthenticatedError, UnauthorizedError } from "../errors";
import { isTokenValid } from "../utils";

export const authUser = (req: Request, res: Response, next: NextFunction) => {
  // NEW - 6/3/2026
  const token = req.signedCookies.token;
  if (!token) throw new UnauthenticatedError("Authentication Invalid");
  try {
    const payload = isTokenValid({ token }) as {
      name: string;
      role: "admin" | "user";
      iat: number;
      userId: string;
    };
    req.user = {
      name: payload.name,
      role: payload.role,
      userId: payload.userId,
    };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};
export const authorizePermissions = (...roles: string[]) => {
  // return another function to be used as callback
  return (req: Request, res: Response, next: NextFunction) => {
    // checking for roles
    if (!roles.includes(req.user.role))
      throw new UnauthorizedError("unauthorized access");
    next();
  };
};
