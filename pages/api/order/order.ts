import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";
import { z } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const orderSchema = z.array(
      z.object({
        menuItem: z.string(),
        quantity: z.number(),
        transactionid: z.number(),
        price: z.number(),
      })
    );

    const response = orderSchema.safeParse(JSON.parse(req.body));
    const cart = JSON.parse(req.body);

    console.log(cart);

    if (!response.success) {
      console.log(response);
      console.log("Invalid Type");
    }

    Promise.all(
      cart.map(
        async (order: {
          menuItem: string;
          quantity: number;
          transactionId: number;
          price: number;
        }) => {
          const result = await prisma.order.create({
            data: {
              menuItem: order.menuItem,
              quantity: order.quantity,
              transactionId: order.transactionId,
              price: order.price,
            },
          });
        }
      )
    ).catch((err) => res.status(400).json(err));

    const subtotal = cart.reduce(
      (
        acc: number,
        curr: {
          menuItem: string;
          quantity: number;
          transactionId: number;
          price: number;
        }
      ) => (acc += curr.price),
      0
    );
    if (cart.length) {
      await prisma.transaction
        .update({
          where: {
            id: cart[0].transactionId,
          },
          data: {
            subtotal: {
              increment: subtotal,
            },
          },
        })
        .catch((err) => res.status(400).json(err));
    }

    res.status(200).json({ success: true });
  }
}
