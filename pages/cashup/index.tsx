import React from "react";
import Navbar from "../../components/Navbar";
import { GetServerSideProps } from "next";
import { CashUp } from "../../config/type";
import { BASE_URL } from "../../constant/config";
import CashupForm from "../../components/CashUp/CashupForm";

interface CashUpProps {
  cashups: CashUp[];
}

const index = ({ cashups }: CashUpProps) => {

  return (
    <div className="flex bg-[#002A53] w-screen h-screen ">
      <Navbar />
      <div className="grow h-full overflow-auto">
        <h1 className="text-white text-2xl text-center my-4">Cash Up</h1>
        <div >
          <div className="my-8">
            <CashupForm />
          </div>
          <div className="relative overflow-x-auto">
            <h2 className="text-white text-xl text-center my-4">Recent Cash Up</h2>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Card
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Cash
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Other
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Started
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ended
                  </th>
                </tr>
              </thead>
              <tbody>
                {cashups &&
                  cashups.map((cashup) => (
                    <tr key={cashup.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {cashup.id.slice(0, 6)}...
                      </th>
                      <td className="px-6 py-4">${cashup.card}</td>
                      <td className="px-6 py-4">${cashup.cash}</td>
                      <td className="px-6 py-4">${cashup.other}</td>
                      <td className="px-6 py-4 font-bold">${cashup.card + cashup.cash + cashup.other}</td>
                      <td className="px-6 py-4">{cashup.createdAt}</td>
                      <td className="px-6 py-4">{cashup.closedAt}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps<{
  cashups: CashUp[];
}> = async () => {
  const result = await fetch(`${BASE_URL}/api/cashup/cashup`);
  const cashups = await result.json();

  return {
    props: {
      cashups,
    },
  };
};
