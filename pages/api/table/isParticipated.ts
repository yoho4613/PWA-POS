import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";
import { z } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const isParticipatedSchema = z.object({
      id: z.string(),
    });

    if (!isParticipatedSchema.safeParse(JSON.parse(req.body))) {
      res.status(400).json("Invalid Type");
    }

    const { id, transactionId } = JSON.parse(req.body);

    const table = await prisma.table.findUnique({
      where: { id },
    });

    const updatedTable = await prisma.table.update({
      where: {
        id,
      },
      data: {
        isParticipated: table?.isParticipated
          ? ""
          : String(transactionId),
      },
    });

    res.status(200).json(updatedTable);
  }
}
