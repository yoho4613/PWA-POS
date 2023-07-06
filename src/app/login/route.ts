import { z } from "zod";
import { prisma } from "../../db";
import { User } from "@/utils/type";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { getJwtSecretKey } from "@/lib/auth";
import bcrypt from "bcryptjs";
import cookie from "cookie";
import { NextRequest, NextResponse } from "next/server";

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export async function POST(req: NextRequest, res: NextResponse) {
  const response = loginSchema.safeParse(req.body)

  if(!response.success) {
    const { errors } = response.error
    
  }

  const { email, password } = response.data

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  const passwordMatch = await bcrypt.compare(password, (user as User).password);

  const adminAccess =
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD;

  if (!adminAccess) {
    if (!user || !passwordMatch || !email || !password) {
      throw new Error("Invalid Email or Password");
    }
  }
  const lastLogin = new Date(Date.now());

  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(new TextEncoder().encode(getJwtSecretKey()));

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("user-token", token, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    })
  );
  await prisma.user.update({
    where: {
      id: user?.id,
    },
    data: {
      ...user,
      lastLogin: new Date(),
    },
  });

  return { success: true };
}
