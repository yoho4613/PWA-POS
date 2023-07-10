import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";
import { z } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const transactionSchema = z.object({
    customerName: z.string(),
    people: z.number(),
  });
  if (req.method === "POST") {
    const { customerName, people } = req.body;
    const response = transactionSchema.safeParse({
      customerName,
      people: Number(people),
    });
    console.log(response);
    if (!response.success) {
      res.status(400).json("Type is Invalid");
    }

    const transaction = await prisma.transaction.create({
      data: {
        customerName,
        people: Number(people),
      },
    });
    res.redirect(307, `/transaction/${transaction.id}`);
    res.status(200).json(transaction);
  }
}
