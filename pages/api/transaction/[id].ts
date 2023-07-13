import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";
import { z } from "zod";
import { BASE_URL } from "../../constant/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: Number(req.query.id),
      },
    });
    if (!transaction) {
      res.status(400).json("Cannot find transaction");
    }

    res.status(200).json(transaction);
  }
}
