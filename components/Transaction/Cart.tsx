import React from "react";
import { Cart, Order, TransactionType } from "../../config/type";
import { BASE_URL } from "../../constant/config";
import { useRouter } from "next/router";

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
        <ul className="flex mb-4 justify-between px-1 py-2 sm:px-4 sm:py-2 font-bold">
          <li className="text-sm">Item</li>
          <li className="text-sm">Qty</li>
          <li className="text-sm">Price</li>
        </ul>

        {orders &&
          orders
            .sort((a, b) => a.createdAt - b.createdAt)
            .map((o) => (
              <ul
                key={o.id}
                className="flex border-b-2 bg-gray-50 px-1 py-2 sm:px-2 sm:py-4 justify-between opacity-60"
              >
                <li className="text-sm sm:text-base font-bold w-1/3 text-left">
                  {o.menuItem}
                </li>
                <li className="text-sm sm:text-base w-1/3">{o.quantity}</li>
                <li className="text-sm sm:text-base w-1/3 text-right">
                  ${Number(o.price)}
                </li>
              </ul>
            ))}
        <div className="border-b-4 sm:border-b-8 border-neutral-600"></div>
        {cart &&
          cart.map((c, i) => (
            <ul
              key={i}
              className="flex border-b-2 bg-gray-50 px-1 py-2 sm:px-2 sm:py-4 justify-between "
            >
              <li className="text-sm sm:text-base font-bold w-1/3 text-left">{c.menuItem.name}</li>
              <li className="text-sm sm:text-base w-1/3">{c.quantity}</li>
              <li className="text-sm sm:text-base w-1/3 text-right">
                ${Number(c.menuItem.price) * Number(c.quantity)}
              </li>
            </ul>
          ))}
      </div>
      <div className="bg-gray-50 border-b-2 p-2 sm:p-4">
        <ul className="display flex sm:flex-row flex-col items-start justify-between">
          <li className="text-sm sm:text-base">
            Total Bill:
            <span>
              ${transaction && transaction.subtotal - transaction.paid}
            </span>
          </li>
          <li className="text-sm sm:text-base">
            Paid: <span>${transaction && transaction.paid}</span>
          </li>
        </ul>
      </div>

      <div className="bg-gray-50 flex justify-center p-2 sm:py-4">
        <button
          onClick={handlePayNow}
          className="focus:outline-none w-1/3 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs sm:text-sm px-1.5 py-0.5 sm:px-3 sm:py-1.5 md:px-5 md:py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Pay Now
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="text-white w-1/3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs sm:text-sm sm:w-auto px-1.5 py-0.5 sm:px-3 sm:py-1.5 md:px-5 md:py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save & Close
        </button>
      </div>
    </div>
  );
};

export default Cart;
