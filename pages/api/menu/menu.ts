import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";
import { z } from "zod";
import { s3 } from "../../../lib/s3";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const menuItems = await prisma.menuItem.findMany();
    // Each menu item only contains its AWS key. Extend all items with their actual img url
    const withUrls = await Promise.all(
      menuItems.map(async (menuItem) => ({
        ...menuItem,
        url: await s3.getSignedUrlPromise("getObject", {
          Bucket: "pwa-pos",
          Key: menuItem.imageKey,
        }),
      }))
    );
    res.status(200).json(withUrls);
  } else if (req.method === "POST") {
    const menuSchema = z.object({
      name: z.string(),
      price: z.number(),
      imageKey: z.string(),
      categories: z.array(z.string()),
    });

    if (!menuSchema.safeParse(JSON.parse(req.body)).success) {
      res.status(400).json("Invalid Type");
    }

    const { name, price, imageKey, categories } = JSON.parse(req.body);
    const menuItem = await prisma.menuItem.create({
      data: {
        name,
        price,
        categories,
        imageKey,
      },
    });

    res.status(200).json(menuItem);
  }

  if (req.method === "DELETE") {
    const imageSchema = z.object({
      id: z.string(),
      imageKey: z.string(),
    });

    if (!imageSchema.safeParse(JSON.parse(req.body)).success) {
      res.status(400).json("Invalid Type");
    }
    const { id, imageKey } = JSON.parse(req.body);
    await s3
      .deleteObject({ Bucket: "restaurant-booking-app", Key: imageKey })
      .promise();
    // Delete the image form db
    const menuItem = await prisma.menuItem.delete({ where: { id } });

    res.status(200).json(menuItem);
  }
}
