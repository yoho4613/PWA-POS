import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;

    const orders = await prisma.order.findMany({
      where: {
        transactionId: Number(id),
      },
    });

    res.status(200).json(orders);
  }
}
