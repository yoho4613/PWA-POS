import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";
import { z } from "zod";
import { BASE_URL } from "../../constant/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
        id: tableId,
      }),
    })
      .then((response) => {
        res.redirect(307, `/transaction/${transaction.id}`);
      })
      .catch((err) => res.status(400).json(err));
  }
}
