import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { BASE_URL } from "../constant/config";
import { TransactionType } from "../../config/type";
import { GetServerSideProps } from "next";
import Searchbar from "../../components/Searchbar";

interface HistoryProps {
  transactions: TransactionType[];
}

const index = ({ transactions }: HistoryProps) => {
  const [filter, setFilter] = useState("");

  return (
    <div className="bg-[#002A53]  w-screen min-h-screen flex ">
      <Navbar />
      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
        <div className=" mt-6">
          <h1 className="text-white text-center text-xl">
            Transaction History
          </h1>
          <div className="flex items-center">
            <Searchbar filter={filter} setFilter={setFilter} />
            <div>
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >
                  On Table
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >
                  Day
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >
                  Week
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >
                  Month
                </button>
                
              </div>
            </div>
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Transaction Id
              </th>
              <th scope="col" className="px-6 py-3">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3">
                People
              </th>
              <th scope="col" className="px-6 py-3">
                Started
              </th>
              <th scope="col" className="px-6 py-3">
                Closed
              </th>
              <th scope="col" className="px-6 py-3">
                Total Charge
              </th>
              <th scope="col" className="px-6 py-3">
                Total Payment
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions &&
              transactions.map((transaction) => (
                <tr
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  key={transaction.id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {transaction.id}
                  </th>
                  <td className="px-6 py-4">{transaction.customerName}</td>
                  <td className="px-6 py-4">{transaction.people}</td>
                  <td className="px-6 py-4">
                    {transaction.createdAt.toString()}
                  </td>
                  <td className={`px-6 py-4 ${!transaction.closedAt && "text-red-500"}`}>
                    {transaction.closedAt
                      ? transaction.closedAt.toString()
                      : "On Table"}
                  </td>
                  <td className="px-6 py-4">{transaction.subtotal}</td>
                  <td className="px-6 py-4">{transaction.paid}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps<{
  transactions: TransactionType[];
}> = async () => {
  const result = await fetch(`${BASE_URL}/api/transaction/transaction`);
  const transactions = await result.json();

  return {
    props: {
      transactions,
    },
  };
};
