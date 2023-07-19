import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";
import { z } from "zod";
import { BASE_URL } from "../../../constant/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === "GET") {
    const users = await prisma.user.findMany()

    res.status(200).json(users)
  }

  if (req.method === "POST") {
    const userSchema = z.object({
      name: z.string(),
      email: z.string(),
      role: z.string(),
      password: z.string()
    })
  }
}
