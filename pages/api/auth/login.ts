// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "../../../db";
import { User } from "../../../config/type";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { getJwtSecretKey } from "../../../lib/auth";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const loginSchema = z.object({
    email: z.string(),
    password: z.string(),
  });

  if (req.method === "POST") {
    const response = loginSchema.safeParse(req.body);

    if (!response.success) {
      return res.status(400).json(response.error);
    }

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    const passwordMatch = await bcrypt.compare(
      password,
      (user as User).password
    );

    if (!user || !passwordMatch || !email || !password) {
      throw new Error("Invalid Email or Password");
    }

    const token = await new SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(new TextEncoder().encode(getJwtSecretKey()));

    res.setHeader(
      "Set-Cookie",
      serialize("user-token-pos", token, {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
      })
    );

    const result = await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        ...user,
        lastLogin: new Date(),
      },
    });
    res.redirect(307, "/");
    return { success: true };
  }

  
}
