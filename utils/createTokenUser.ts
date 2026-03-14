import { Response } from "express";
import { attachCookiesToResponse } from "./jwt";

type UserPropsAndRes = {
  userId: any;
  name: string;
  role: "admin" | "user";
  res: Response;
};
function createTokenUser(user: UserPropsAndRes) {
  const tokenUser = {
    userId: user.userId,
    name: user.name,
    role: user.role,
  };
  attachCookiesToResponse({ payload: { tokenUser, res: user.res } });
}
export default createTokenUser;
