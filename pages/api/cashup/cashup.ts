import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const cashups = await prisma.cashup.findMany();

    res.status(200).json(cashups);
  }
}
