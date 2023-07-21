import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";
import { z } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const cashups = await prisma.cashup.findMany();

    res.status(200).json(cashups);
  } else if (req.method === "POST") {
    const cashupSchema = z.object({
      cash: z.number(),
      card: z.number(),
      other: z.number(),
    });
    const response = cashupSchema.safeParse(JSON.parse(req.body));
    if (!response.success) {
      return res.status(400).json("Invalid Type");
    }

    const { cash, card, other } = JSON.parse(req.body);

    const currentCashup = await prisma.cashup.findFirst({
      where: {
        closedAt: null,
      },
    });

    const cashup = await prisma.cashup.update({
      where: {
        id: currentCashup?.id,
      },
      data: {
        cash,
        card,
        other,
        closedAt: new Date(),
      },
    });

    const newCashup = await prisma.cashup.create({
      data: {
        cash: 0,
        card: 0,
        other: 0,
      },
    });

    return res.status(200).json({ cashup, newCashup });
  }
}
