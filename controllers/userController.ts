import { Request, Response } from "express";
import { User } from "../models/User";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors";

// That's an admin action
const getAllUsers = async function name(req: Request, res: Response) {
  const users = await User.find({ role: "user" }).select("-password");
  if (users.length === 0)
    return res
      .status(StatusCodes.OK)
      .json({ users: [], msg: "no users found..." });
  res.status(StatusCodes.OK).json({ users });
};
const getSingleUser = async function name(req: Request, res: Response) {
  const { id } = req.params;
  const user = await User.findOne({ _id: id }).select("-password");
  if (!user)
    return res
      .status(StatusCodes.OK)
      .json({ msg: `no user with ID: ${id} was found...` });
  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async function name(req: Request, res: Response) {
  res.send("show User");
};

const updateUser = async function name(req: Request, res: Response) {
  res.send("update User");
};

const updateUserPassword = async function name(req: Request, res: Response) {
  res.send("update User Password");
};

export {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
