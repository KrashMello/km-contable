import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

type ResponseData = {
  message?: string;
  username: String;
  password: String;
};

const prisma = new PrismaClient();

export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json("ok");
  } catch (e) {
    return res.status(401).json({ message: "Invalid Token" });
  }
}
