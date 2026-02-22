import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors";
interface IRequest extends Request {
  user: { name: string; userId: string; role: "admin" | "user" };
}
export const authUser = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  // accessing authorization header to check if token exists
  let token: string | undefined;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }
  if (!token) throw new UnauthenticatedError("Authentication invalid");
  // verifying the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded) throw new UnauthenticatedError("Token invalid");
    // getting the payload and attach it to the user property in req object.
    const { userId, role, name } = decoded as {
      userId: string;
      role: "admin" | "user";
      name: string;
    };
    req["user"] = { userId, role, name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Unauthorized access");
  }
};
