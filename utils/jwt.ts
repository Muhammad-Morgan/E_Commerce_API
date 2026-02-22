import jwt from "jsonwebtoken";
import { StringValue } from "ms";

export const createJWT = ({ payload }: { payload: any }) => {
  const token = jwt.sign(
    { name: payload.name, userId: payload._id, role: payload.role },
    process.env.JWT_SECRET!,
    {
      expiresIn: process.env.JWT_LIFETIME as StringValue,
    },
  );
  return token;
};
export const isTokenValid = ({ token }: { token: string }) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  return decoded;
};
