import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const currentCashup = await prisma.cashup.findFirst({
      where: {
        closedAt: null,
      },
    });

    if (!currentCashup) {
      return res.status(400).json("There's no cashup opened");
    }

    console.log(currentCashup)

    res.status(200).json(currentCashup);
  }
}
