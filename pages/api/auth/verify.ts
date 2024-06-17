import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
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
  const { token } = JSON.parse(req.body);
  try {
    jwt.verify(token, "asdf");
    return res.status(200).json("ok");
  } catch (e) {
    return res.status(401).json({ message: "Invalid Token" });
  }
}
