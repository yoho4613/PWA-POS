import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";
import { z } from "zod";
import { BASE_URL } from "../../constant/config";
import bcrypt from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const users = await prisma.user.findMany();

    res.status(200).json(users);
  } else if (req.method === "POST") {
    const userSchema = z.object({
      name: z.string(),
      email: z.string(),
      role: z.string(),
      password: z.string(),
    });

    const response = userSchema.safeParse(JSON.parse(req.body));
    if (!response.success) {
      res.status(400).json("Invalid Type");
    }

    const { email, password, name, role } = JSON.parse(req.body);
    if (!email || !password || !name || !role) {
      res.status(400).json("Missing Information");
    }
    const hasedPassword = await bcrypt.hash(password, 10);

    const user_exist = await prisma.user.findUnique({
      where: { email },
    });

    if (user_exist) {
      res.status(401).json("User Already Exist");
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: hasedPassword,
        name,
        role,
      },
    });

    res.status(200).json(user);
  } else if (req.method === "PUT") {
    const userSchema = z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      role: z.string(),
      password: z.string(),
    });

    const response = userSchema.safeParse(JSON.parse(req.body));
    if (!response.success) {
      res.status(402).json("Invalid Type");
    }

    const { email, password, name, role, id } = JSON.parse(req.body);

    if (!email || !password || !name || !role || !id) {
      res.status(400).json("Missing Information");
    }
    const hasedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        password: hasedPassword,
        name,
        role,
      },
    });

    res.status(200).json(user);
  } else if (req.method === "DELETE") {
    const userSchema = z.object({
      id: z.string(),
    });

    const response = userSchema.safeParse(JSON.parse(req.body));
    if (!response.success) {
      return res.status(400).json("Invalid Type");
    }

    const { id } = JSON.parse(req.body);

    const user = await prisma.user.delete({
      where: { id },
    });
  }
}
