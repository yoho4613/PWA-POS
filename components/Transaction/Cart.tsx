import React from "react";
import { Cart, Order, TransactionType } from "../../config/type";
import { BASE_URL } from "../../pages/constant/config";
import { useRouter } from "next/router";
import Link from "next/link";

interface CartProps {
  cart: Cart[];
  setCart: React.Dispatch<React.SetStateAction<Cart[]>>;
  transaction: TransactionType;
  orders: Order[];
}

const Cart = ({ cart, setCart, transaction, orders }: CartProps) => {
  const router = useRouter();
  const handleSave = async () => {
    await fetchOrder(cart).catch((err) => console.log(err));
    router.push("/");
  };

  const fetchOrder = async (cart: Cart[]) => {
    const cartItems = cart.map((c) => ({
      menuItem: c.menuItem.name,
      quantity: c.quantity,
      transactionId: Number(transaction.id),
      price: Number(c.menuItem.price) * Number(c.quantity),
    }));

    await fetch(`${BASE_URL}/api/order/order`, {
      method: "POST",
      body: JSON.stringify(cartItems),
    })
      .then((res) => {
        setCart([]);
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePayNow = async () => {
    if (cart.length) {
      await fetchOrder(cart).catch((err) => console.log(err));
    }
    router.push(`/transaction/payment/${transaction.id}`);
  };
  return (
    <div className="bg-gray-200 h-full w-full text-center flex flex-col">
      <div className="grow">
        <div className="flex justify-between px-2 py-4">
          <h2>#{transaction.id}</h2>
          <h4>{transaction.customerName}</h4>
          <p>({transaction.people})</p>
        </div>
        <ul className="flex mb-4 justify-between px-4 py-2 font-bold">
          <li>Item</li>
          <li>Qty</li>
          <li>Price</li>
        </ul>

        {orders &&
          orders
            .sort((a, b) => a.createdAt - b.createdAt)
            .map((o) => (
              <ul
                key={o.id}
                className="flex border-b-2 bg-gray-50 px-2 py-4 justify-between opacity-60"
              >
                <li className="font-bold w-1/3 text-left">{o.menuItem}</li>
                <li className="w-1/3">{o.quantity}</li>
                <li className="w-1/3 text-right">
                  {Number(o.quantity) * Number(o.price)}
                </li>
              </ul>
            ))}
        <div className=" border-b-8 border-neutral-600"></div>
        {cart &&
          cart.map((c, i) => (
            <ul
              key={i}
              className="flex border-b-2 bg-gray-50 px-2 py-4 justify-between "
            >
              <li className="font-bold w-1/3 text-left">{c.menuItem.name}</li>
              <li className="w-1/3">{c.quantity}</li>
              <li className="w-1/3 text-right">
                ${Number(c.menuItem.price) * Number(c.quantity)}
              </li>
            </ul>
          ))}
      </div>

      <div className="bg-gray-50 py-4">
        <button
          onClick={handlePayNow}
          className="focus:outline-none w-1/3 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Pay Now
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="text-white w-1/3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save & Close
        </button>
      </div>
    </div>
  );
};

export default Cart;
