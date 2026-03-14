import { CustomAPIError } from "./cutom-api";
import { StatusCodes } from "http-status-codes";

export class UnauthorizedError extends CustomAPIError {
  statusCode: typeof StatusCodes.FORBIDDEN;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
