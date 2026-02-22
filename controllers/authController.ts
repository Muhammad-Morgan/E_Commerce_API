import { Request, Response } from "express";
import { User } from "../models/User";
import { BadRequestError, UnauthenticatedError } from "../errors";
import { StatusCodes } from "http-status-codes";
import { attachCookiesToResponse } from "../utils";

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

  // creating token
  const tokenUser = { name, userId: user._id, role: user.role };

  attachCookiesToResponse({ payload: { tokenUser, res } });
  res.status(StatusCodes.CREATED).json({
    user: { name: user.name, role: user.role, userId: user._id },
  });
};
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError("Please fill the credentials");
  const existingUser = await User.findOne({ email });
  if (!existingUser) throw new UnauthenticatedError("No user found");
  const isMatch = existingUser.comparePassword(password);
  if (!isMatch) throw new UnauthenticatedError("Wrong password");
  // calling attach...
  const tokenUser = {
    userId: existingUser._id,
    name: existingUser.name,
    role: existingUser.role,
  };
  attachCookiesToResponse({ payload: { tokenUser, res } });
  res.status(StatusCodes.OK).json({
    user: {
      name: existingUser.name,
      role: existingUser.role,
      userId: existingUser._id,
    },
  });
};
const logout = async (req: Request, res: Response) => {
  res.cookie("token", "", {
    expires: new Date(Date.now()), // Expires now.
    httpOnly: true,
  });
  res.status(StatusCodes.OK).json({ msg: "logout user" });
};
export { register, login, logout };
