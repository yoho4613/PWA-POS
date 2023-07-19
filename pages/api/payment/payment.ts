import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";
import { z } from "zod";
import { BASE_URL } from "../../../constant/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log(req.body);
    const paymentSchema = z.object({
      amount: z.number(),
      method: z.string(),
      transactionId: z.number(),
    });

    const response = paymentSchema.safeParse(JSON.parse(req.body));
    if (!response.success) {
      res.status(400).json("Invalid Payment Type");
    }

    const payment = await prisma.payment.create({
      data: JSON.parse(req.body),
    });

    if (!payment) {
      res.status(401).json("Could not process with payment");
    }

    const transaction = await prisma.transaction.update({
      where: {
        id: JSON.parse(req.body).transactionId,
      },
      data: {
        paid: {
          increment: payment.amount,
        },
        closedAt: new Date(),
      },
    });

    if (transaction.subtotal <= transaction.paid) {
      await fetch(`${BASE_URL}/api/table/isParticipated`, {
        method: "POST",
        body: JSON.stringify({ id: transaction.table }),
      });
    }

    res.status(200).json(transaction);
  }
}
