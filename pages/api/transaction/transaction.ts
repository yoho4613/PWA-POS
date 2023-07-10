import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";
import { z } from "zod";
import { BASE_URL } from "../../constant/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const transactionSchema = z.object({
    customerName: z.string(),
    people: z.number(),
    table: z.object({
      id: z.string(),
      name: z.string(),
      capacity: z.number(),
      location: z.string(),
      isParticipated: z.boolean(),
    }),
  });
  if (req.method === "POST") {
    const { customerName, people, table } = req.body;
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

    const updatedTable = await fetch(`${BASE_URL}/api/table/isParticipated`, {
      method: "POST",
      body: JSON.stringify({
        id: table.id,
      }),
    });

    res.redirect(307, `/transaction/${transaction.id}`);
    res.status(200).json(transaction);
  }
}
