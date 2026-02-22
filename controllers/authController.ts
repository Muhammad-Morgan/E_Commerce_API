import { Request, Response } from "express";
import { User } from "../models/User";
import { BadRequestError } from "../errors";
import { StatusCodes } from "http-status-codes";
import { createJWT } from "../utils";

const register = async (req: Request, res: Response) => {
  // check if email exists already
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist)
    throw new BadRequestError("A user with same email is registered...");
  // create user
  const { name, email, password } = req.body;
  // first registered is admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";
  const user = await User.create({ name, email, password, role });
  const tokenUser = { name, userId: user._id, role: user.role };
  const token = createJWT({ payload: tokenUser });
  res.status(StatusCodes.CREATED).json({
    user: { name: user.name, role: user.role, userId: user._id },
    token,
  });
};
const login = async (req: Request, res: Response) => {
  res.send("login user");
};
const logout = async (req: Request, res: Response) => {
  res.send("logout user");
};
export { register, login, logout };
