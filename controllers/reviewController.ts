import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

export const getAllReviews = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ msg: "get all reviews" });
};

export const getSingleReview = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ msg: "get single review" });
};

export const createReview = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ msg: "create a review" });
};

export const updateReview = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ msg: "update a review" });
};

export const deleteReview = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ msg: "delete a review" });
};
