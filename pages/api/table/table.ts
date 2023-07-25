import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";
import { z } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const tables = await prisma.table.findMany();

    res.status(200).json(tables);
  } else if (req.method === "POST") {
    const tableSchema = z.object({
      name: z.string(),
      location: z.string(),
      capacity: z.number(),
    });
    const response = tableSchema.safeParse(JSON.parse(req.body));
    if (!response.success) {
      return res.status(400).json("Invalid Type");
    }

    const table = await prisma.table.create({
      data: JSON.parse(req.body),
    });

    return res.status(200).json(table);
  } else if (req.method === "PUT") {
    const tableSchema = z.object({
      id: z.string(),
      name: z.string(),
      location: z.string(),
      capacity: z.number(),
    });
    const response = tableSchema.safeParse(JSON.parse(req.body));
    if (!response.success) {
      return res.status(400).json("Invalid Type");
    }
    const { id } = JSON.parse(req.body);
    const table = await prisma.table.update({
      where: {
        id,
      },
      data: JSON.parse(req.body),
    });

    return res.status(200).json(table);
  } else if (req.method === "DELETE") {
    const tableSchema = z.object({
      id: z.string(),
    });
    const response = tableSchema.safeParse(JSON.parse(req.body));
    if (!response.success) {
      return res.status(400).json("Invalid Type");
    }
    const { id } = JSON.parse(req.body);
    const table = await prisma.table.delete({
      where: {
        id,
      },
    });

    res.status(200).json(table);
  }
}
