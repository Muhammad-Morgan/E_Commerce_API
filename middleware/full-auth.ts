import { Request, Response, NextFunction } from "express";
import { UnauthenticatedError } from "../errors";
// import { isTokenValid } from "../utils/jwt"

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  let token: string | undefined | null;
  // check header
  const authHeader: string | undefined = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1]!;
  }
  // NEW: check cookies
  else if (req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) throw new UnauthenticatedError("Authentication invalid");
  try {
    // verifying the token
    // const payload = isTokenValid(token);

    // attach user and his permissions to the req object
    // req.user = {
    //   userId: payload.user.userId,
    //   role: payload.user.role,
    // };

    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};
