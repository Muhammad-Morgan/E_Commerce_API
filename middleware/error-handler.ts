import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

export const errorHandlerMiddleware = (
  req: Request,
  res: Response,
  err: any,
) => {
  // define custom error model.
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong...",
  };
  // checking for duplicates.
  if (err.code && err.code === 11000) {
    // accessing 'keyValue' property, and add it to customError.message. Then adding bad_request statusCode
    customError["message"] =
      `Duplicate value entered for ${Object.keys(err.keyValue)} field. Choose another value.`;
    customError["statusCode"] = StatusCodes.BAD_REQUEST;
  }
  // checking for validation issues.
  if (err.name === "ValidationError") {
    // getting all values for keys in 'errors' object.
    customError["message"] = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(",");
    customError["statusCode"] = StatusCodes.BAD_REQUEST;
  }
  // checking for cast error
  if (err.name === "CastError") {
    customError["message"] = `No item found with id: ${err.value}`;
    customError["statusCode"] = StatusCodes.NOT_FOUND;
  }
  // sending the customError
  return res.status(customError.statusCode).json({ msg: customError.message });
};
