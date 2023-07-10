import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";
import { z } from "zod";
import { s3 } from "../../../lib/s3";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const menuSchema = z.object({
      name: z.string(),
      price: z.string(),
      imageKey: z.string(),
      categories: z.array(z.string()),
    });

    if (!menuSchema.safeParse(req.body).success) {
      res.status(400).json("Invalid Type");
    }

    const { name, price, imageKey, categories } = req.body;
    const menuItem = await prisma.menuItem.create({
      data: {
        name,
        price,
        categories,
        imageKey,
      },
    });

    res.status(200).json({ menuItem });
  }

  if (req.method === "DELETED") {
    const imageSchema = z.object({
      id: z.string(),
      imageKey: z.string(),
    });

    if (!imageSchema.safeParse(JSON.parse(req.body)).success) {
      res.status(400).json("Invalid Type");
    }
    const { id, imageKey } = req.body;
    await s3
      .deleteObject({ Bucket: "restaurant-booking-app", Key: imageKey })
      .promise();
    // Delete the image form db
    const menuItem = await prisma.menuItem.delete({ where: { id } });

    res.status(200).json(menuItem);
  }
}
