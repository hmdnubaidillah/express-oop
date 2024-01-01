import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export async function signToken(id: ObjectId) {
  const accessToken: string = jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
    expiresIn: "24h",
  });

  const token = {
    accessToken,
  };

  return token;
}
