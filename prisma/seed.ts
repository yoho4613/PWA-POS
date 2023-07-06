import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      email: "superadmin@email.com",
      password: "superadmin",
      name: "superadmin",
      role: "superadmin",
    },
    {
      email: "admin@email.com",
      password: "admin",
      name: "admin",
      role: "admin",
    },
  ];

  // await prisma.user.create({
  //   data: {
  //     email: users[0].email,
  //     password: users[0].password
  //   }
  // })

  await Promise.all(
    users.map(async (user) =>
      prisma.user.create({
        data: {
          email: user.email,
          password: user.password,
          name: user.name,
          role: "admin",
        },
      })
    )
  );

  await prisma.$disconnect();

}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
