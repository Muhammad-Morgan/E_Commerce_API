import { Request, Response, NextFunction } from "express";
import { UnauthenticatedError } from "../errors";
import { isTokenValid } from "../utils";
interface IRequest extends Request {
  user: { name?: string; userId: string; role: "admin" | "user" };
}
export const authenticateUser = async (
  req: IRequest,
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
    const payload = isTokenValid({ token }) as {
      name?: string;
      userId: string;
      role: "admin" | "user";
    };
    // attach user and his permissions to the req object
    req.user = {
      userId: payload.userId,
      role: payload.role,
    };

    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};
