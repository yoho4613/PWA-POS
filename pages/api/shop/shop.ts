import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";
import { z } from "zod";
import { s3 } from "../../../lib/s3";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const shop = await prisma.shop.findFirst();
    // Each menu item only contains its AWS key. Extend all items with their actual img url
    const withUrls = {
      ...shop,
      url: await s3.getSignedUrlPromise("getObject", {
        Bucket: "pwa-pos",
        Key: shop?.logoKey,
      }),
    };

    return res.status(200).json(withUrls);
  } else if (req.method === "POST") {
    const shopSchema = z.object({
      name: z.string(),
      address: z.string(),
      contact: z.string(),
      email: z.string(),
      tax: z.string(),
      logoKey: z.string(),
      description: z.string(),
    });

    if (!shopSchema.safeParse(JSON.parse(req.body)).success) {
      return res.status(400).json("Invalid Type");
    }

    const shop = await prisma.shop.create({
      data: JSON.parse(req.body),
    });

    return res.status(200).json(shop);
  } else if (req.method === "PUT") {
    const shopSchemaWithKey = z.object({
      id: z.string(),
      name: z.string(),
      address: z.string(),
      contact: z.string(),
      email: z.string(),
      tax: z.string(),
      logoKey: z.string(),
      description: z.string(),
      cashBalance: z.number(),
    }).safeParse(JSON.parse(req.body))

    const shopSchemaWithoutKey = z.object({
      id: z.string(),
      name: z.string(),
      address: z.string(),
      contact: z.string(),
      email: z.string(),
      tax: z.string(),
      logoKey: z.string(),
      description: z.string(),
      cashBalance: z.number(),
    }).safeParse(JSON.parse(req.body))



    if (!shopSchemaWithKey && !shopSchemaWithoutKey) {
      console.log(shopSchemaWithKey)
      console.log(shopSchemaWithoutKey)
      return res.status(400).json("Invalid Type");
    }

    const data = JSON.parse(req.body);

    const shop = await prisma.shop.update({
      where: {
        id: data.id,
      },
      data,
    });

    return res.status(200).json(shop);
  } else if (req.method === "DELETE") {
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
