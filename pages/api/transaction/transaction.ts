import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";
import { z } from "zod";
import { BASE_URL } from "../../../constant/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const transactions = await prisma.transaction.findMany();

    res.status(200).json(transactions);
  }
  if (req.method === "POST") {
    const transactionSchema = z.object({
      customerName: z.string(),
      people: z.number(),
      tableId: z.string(),
    });
    const { customerName, people, tableId } = req.body;
    const response = transactionSchema.safeParse({
      customerName,
      people: Number(people),
      tableId,
    });

    if (!response.success) {
      res.status(400).json("Type is Invalid");
    }

    const result = await fetch(`${BASE_URL}/api/cashup/currentCashup`);
    const currentCashup = await result.json();

    const transaction = await prisma.transaction.create({
      data: {
        customerName,
        people: Number(people),
        table: tableId,
        cashupId: currentCashup.id,
      },
    });

    await fetch(`${BASE_URL}/api/table/isParticipated`, {
      method: "POST",
      body: JSON.stringify({
        id: tableId,
        transactionId: transaction.id,
      }),
    })
      .then(() => {
        res.redirect(307, `/transaction/${transaction.id}`);
      })
      .catch((err) => res.status(400).json(err));
  }
}
