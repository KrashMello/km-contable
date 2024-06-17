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
  const { username, password } = JSON.parse(req.body);
  const user = await prisma.User.findUnique({
    where: {
      username,
    },
  });

  if (!user || !bcrypt.compareSync(password, user.password))
    return res.status(401).json({ message: "Wrong credentials" });

  delete user.password;
  const token = jwt.sign({ username }, "asdf", { expiresIn: "1h" });
  console.log(jwt.verify(token, "asdf"));
  console.log(token);
  return res.status(200).json(token);
}
