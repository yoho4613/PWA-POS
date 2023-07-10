import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

interface Table {
  id: string;
  name: string;
  capacity: number;
  location: string;
  isParticipated: false;
}

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

  const tables: Table[] = [
    {
      id: "clhkg2kho412w03qor8m18nqi",
      name: "1",
      location: "bar",
      capacity: 4,
      isParticipated: false,
    },
    {
      id: "clhkg2kho415w03qor8m18nqi",
      name: "2",
      location: "bar",
      capacity: 4,
      isParticipated: false,
    },
    {
      id: "clhkg2kho410w03qor8m18nqi",
      name: "3",
      location: "bar",
      capacity: 4,
      isParticipated: false,
    },
    {
      id: "clhkg2kho411w03qor8m18nqi",
      name: "4",
      location: "bar",
      capacity: 4,
      isParticipated: false,
    },
    {
      id: "clhkg2kho413w03qor8m18nqi",
      name: "5",
      location: "Floor",
      capacity: 6,
      isParticipated: false,
    },
    {
      id: "clhkg2kho408w03qor8m18nqi",
      name: "6",
      location: "Floor",
      capacity: 6,
      isParticipated: false,
    },
    {
      id: "clhkg2kho407w03qor8m18nqi",
      name: "7",
      location: "Floor",
      capacity: 8,
      isParticipated: false,
    },
    {
      id: "clhkg2kho406w03qor8m18nqi",
      name: "8",
      location: "Floor",
      capacity: 8,
      isParticipated: false,
    },
    {
      id: "clhkg2kho405w03qor8m18nqi",
      name: "9",
      location: "Floor",
      capacity: 4,
      isParticipated: false,
    },
    {
      id: "clhkg2kho403w03qor8m18nqi",
      name: "10",
      location: "Floor",
      capacity: 8,
      isParticipated: false,
    },
    {
      id: "clhkg2kho404w03qor8m18nqi",
      name: "outside 1",
      location: "Outside",
      capacity: 4,
      isParticipated: false,
    },
    {
      id: "clhkg2kho402w03qor8m18nqi",
      name: "outside 2",
      location: "Outside",
      capacity: 4,
      isParticipated: false,
    },
    {
      id: "clhkg2kho401w03qor8m18nqi",
      name: "outside big1",
      location: "Floor",
      capacity: 8,
      isParticipated: false,
    },
    {
      id: "clhkg2kho400w03qor8m18nqi",
      name: "outside big2",
      location: "Floor",
      capacity: 10,
      isParticipated: false,
    },
  ];

  for (const table of tables) {
    await prisma.table.create({
      data: {
        id: table.id,
        name: table.name,
        location: table.location,
        capacity: table.capacity,
        isParticipated: table.isParticipated,
      },
    });
  }

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

  const categories = ["Breakfast", "Lunch", "Dinner", "Drink"];

  await Promise.all(
    categories.map(async (category) => {
      await prisma.categories.create({
        data: {
          name: category,
        },
      });
    })
  );

  await prisma.$disconnect();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
