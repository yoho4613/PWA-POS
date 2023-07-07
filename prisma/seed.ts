import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      name: "jiho",
      email: "superadmin@email.com",
      password: "superadmin",
      role: "superadmin",
    },
    {
      name: "jiho",
      email: "admin@email.com",
      password: "admin",
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
          name: user.name,
          email: user.email,
          password: await bcrypt.hash(user.password, 10),
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
