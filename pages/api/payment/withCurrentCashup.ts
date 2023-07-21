import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";
import { z } from "zod";
import { BASE_URL } from "../../../constant/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const result = await fetch(`${BASE_URL}/api/cashup/currentCashup`);
    const currentCashup = await result.json();

    if (!currentCashup) {
      res.status(400).json("There's no opend Cash Up");
    }

    const payments = await prisma.payment.findMany({
      where: {
        createdAt: {
          gt: currentCashup.createdAt,
        },
      },
    });

    res.status(200).json(payments);
  }
}
