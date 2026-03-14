import type { UserPayload } from "../models/User";

declare module "express-serve-static-core" {
  interface Request {
    user?: UserPayload;
  }
}

export {};
