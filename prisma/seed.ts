import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";

interface Table {
  id: string;
  name: string;
  capacity: number;
  location: string;
  isParticipated: string;
}

const prisma = new PrismaClient();

async function main() {
  const shop = {
    name: "FC Restaurant",
    address: "145 Nelson Street, Auckland",
    contact: "021-087-35461",
    email: "yoho4613@gmail.com",
    logoKey: "123124123",
    tax: "123-123-123",
    cashBalance: 200,
    description: "FC Restaurant is best asian restaurant in New Zealand.",
  };

  await prisma.shop.create({
    data: shop,
  });

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
      isParticipated: "",
    },
    {
      id: "clhkg2kho415w03qor8m18nqi",
      name: "2",
      location: "bar",
      capacity: 4,
      isParticipated: "",
    },
    {
      id: "clhkg2kho410w03qor8m18nqi",
      name: "3",
      location: "bar",
      capacity: 4,
      isParticipated: "",
    },
    {
      id: "clhkg2kho411w03qor8m18nqi",
      name: "4",
      location: "bar",
      capacity: 4,
      isParticipated: "",
    },
    {
      id: "clhkg2kho413w03qor8m18nqi",
      name: "5",
      location: "Floor",
      capacity: 6,
      isParticipated: "",
    },
    {
      id: "clhkg2kho408w03qor8m18nqi",
      name: "6",
      location: "Floor",
      capacity: 6,
      isParticipated: "",
    },
    {
      id: "clhkg2kho407w03qor8m18nqi",
      name: "7",
      location: "Floor",
      capacity: 8,
      isParticipated: "",
    },
    {
      id: "clhkg2kho406w03qor8m18nqi",
      name: "8",
      location: "Floor",
      capacity: 8,
      isParticipated: "",
    },
    {
      id: "clhkg2kho405w03qor8m18nqi",
      name: "9",
      location: "Floor",
      capacity: 4,
      isParticipated: "",
    },
    {
      id: "clhkg2kho403w03qor8m18nqi",
      name: "10",
      location: "Floor",
      capacity: 8,
      isParticipated: "",
    },
    {
      id: "clhkg2kho404w03qor8m18nqi",
      name: "outside 1",
      location: "Outside",
      capacity: 4,
      isParticipated: "",
    },
    {
      id: "clhkg2kho402w03qor8m18nqi",
      name: "outside 2",
      location: "Outside",
      capacity: 4,
      isParticipated: "",
    },
    {
      id: "clhkg2kho401w03qor8m18nqi",
      name: "outside big1",
      location: "Floor",
      capacity: 8,
      isParticipated: "",
    },
    {
      id: "clhkg2kho400w03qor8m18nqi",
      name: "outside big2",
      location: "Floor",
      capacity: 10,
      isParticipated: "",
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

  const categories = [
    { name: "Breakfast", id: "cljxp4rbs000003ocntutxfqy" },
    { name: "Lunch", id: "cljxp4rbs000103oc6nhfn8b8" },
    { name: "Dinner", id: "cljxp4rby000203ocr5e26bue" },
    { name: "Drink", id: "cljzfwwc30006031n55i1tgvw" },
  ];

  await Promise.all(
    categories.map(async (category) => {
      await prisma.categories.create({
        data: {
          id: category.id,
          name: category.name,
        },
      });
    })
  );

  const menus = [
    {
      id: "cljzfkb0f0002031na03wjyzx",
      createdAt: "2023-07-12T07:59:28.192Z",
      updatedAt: "2023-07-12T07:59:28.192Z",
      name: "Big Breakfast",
      price: 32,
      categories: ["cljxp4rbs000003ocntutxfqy", "cljxp4rbs000103oc6nhfn8b8"],
      imageKey: "oQBKMNUdH_wv-TSFW43Tt.jpeg",
      active: true,
      description: "Mushroom, Scrambled Eggs, Baked Bean, Bread, Bacon",
    },
    {
      id: "cljzfm7q00003031nmwawl0ev",
      createdAt: "2023-07-12T08:00:57.240Z",
      updatedAt: "2023-07-12T08:00:57.240Z",
      name: "Soft tofu soup",
      price: 24,
      categories: ["cljxp4rbs000103oc6nhfn8b8"],
      imageKey: "Cbc5apECJi6fH0IL_kNJV.jpeg",
      active: true,
      description: "Korean food. with eggs, soft tofu, vegetables",
    },
    {
      id: "cljzfn5p30004031nkcwlztit",
      createdAt: "2023-07-12T08:01:41.271Z",
      updatedAt: "2023-07-12T08:01:41.271Z",
      name: "Burger",
      price: 28,
      categories: ["cljxp4rby000203ocr5e26bue"],
      imageKey: "37D3o6MW79nfl-xllhmbS.jpeg",
      active: true,
      description: "Big hand made burger with eggs, pork patty and vegetables",
    },
    {
      id: "cljzfu6gi0005031nq534vg0u",
      createdAt: "2023-07-12T08:07:08.827Z",
      updatedAt: "2023-07-12T08:07:08.827Z",
      name: "Chicken Katsu",
      price: 23,
      categories: ["cljxp4rbs000103oc6nhfn8b8", "cljxp4rby000203ocr5e26bue"],
      imageKey: "6RvbMeMxFP5ZxrToIKJCD.jpeg",
      active: true,
      description: "Chicken Katsu with special sause",
    },
    {
      id: "cljzfwwc30006031n55i1tgvw",
      createdAt: "2023-07-12T08:09:15.685Z",
      updatedAt: "2023-07-12T08:09:15.685Z",
      name: "Coke Zero",
      price: 4,
      categories: ["cljxp4rbz000303ocbekbjevg"],
      imageKey: "jP0yMgOkIHFy_U87SZE6Y.avif",
      active: true,
      description: "Coke Zero (No sugar)",
    },
  ];

  await Promise.all(
    menus.map(async (menu) => {
      await prisma.menuItem.create({
        data: {
          id: menu.id,
          name: menu.name,
          price: menu.price,
          categories: menu.categories,
          imageKey: menu.imageKey,
          description: menu.description,
        },
      });
    })
  );

  const cashups = [];

  const now = new Date();
  for (let i = 1; i < 60; i++) {
    cashups.push({
      cash: faker.number.int({ min: 50, max: 250 }),
      card: faker.number.int({ min: 500, max: 2500 }),
      other: faker.number.int({ min: 0, max: 100 }),
      createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * i),
      closedAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * (i - 1)),
    });
  }
  await Promise.all(
    cashups.map(async (cashup) => {
      await prisma.cashup.create({
        data: cashup,
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
