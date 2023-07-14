import { GetServerSideProps } from "next";
import React from "react";
import { BASE_URL } from "../../constant/config";
import { Order, TransactionType } from "../../../config/type";
import Link from "next/link";

interface PaymentProps {
  query: { id: string };
  transaction: TransactionType;
  orders: Order[];
}

const Payment = ({ query, transaction, orders }: PaymentProps) => {
  console.log(transaction);
  return (
    <div className="bg-[#002A53] w-screen min-h-screen flex flex-col justify-center items-center ">
      <div className="bg-gray-200 w-1/3 p-6 rounded-lg">
        <h2 className="font-bold text-lg">Items:</h2>
        <div className="my-4">
          <div>
            <div className="flex justify-between">
              <p className="font-bold w-1/3">Item</p>
              <p className="font-bold w-1/3 text-center">Qty</p>
              <p className="font-bold w-1/3 text-right">Price</p>
            </div>
            {orders.map((order) => (
              <div className="flex  justify-between ">
                <p className="w-1/3">{order.menuItem}</p>
                <p className="w-1/3 text-center">{order.quantity}</p>
                <p className="w-1/3 text-right">${order.price}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <h2>Remaining Balance:</h2>
          <p>${transaction.subtotal}</p>
        </div>

        <div className="text-center w-full mt-10">
          <Link
            href={`/transaction/${transaction.id}`}
            className="focus:outline-none w-1/3 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Cancel
          </Link>
          <button
            type="button"
            // onClick={handleSave}
            className="text-white w-1/3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;

export const getServerSideProps: GetServerSideProps<{
  transaction: TransactionType;
  orders: Order[];
}> = async ({ query }) => {
  const result3 = await fetch(`${BASE_URL}/api/transaction/${query.id}`);
  const transaction = await result3.json();
  const result4 = await fetch(`${BASE_URL}/api/order/${query.id}`);
  const orders = await result4.json();
  return {
    props: {
      query,
      transaction,
      orders,
    },
  };
};
