import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../constant/config";
import { useRouter } from "next/router";

interface SummaryProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  cashProfit: number;
  cardProfit: number;
  otherProfit: number;
}

const Summary = ({
  setStep,
  cashProfit,
  cardProfit,
  otherProfit,
}: SummaryProps) => {
  const [cashBalance, setCashBalance] = useState(0);
  const router = useRouter()

  useEffect(() => {
    fetch(`${BASE_URL}/api/shop/shop`)
      .then((res) => res.json())
      .then((res) => setCashBalance(res.cashBalance))
      .catch((err) => console.log(err));
  }, []);

  const now = new Date();

  const submitCashup = async () => {
    const result = fetch(`${BASE_URL}/api/cashup/cashup`, {
      method: "POST",
      body: JSON.stringify({
        cash: cashProfit - cashBalance,
        card: cardProfit,
        other: otherProfit,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setStep(prev => prev+1)
        router.replace(router.asPath)
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
        <div className="flex justify-between flex-wrap">
          <h1 className="text-xl font-bold text-white capitalize dark:text-white">
            Cash Up Summary
          </h1>
          <span className="text-white text-base sm:text-lg dark:text-gray-200">
            {now.getDate()} / {now.getMonth()} / {now.getFullYear()}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-4 ">
          <div className="flex items-center justify-between">
            <span className="text-white text-base sm:text-lg dark:text-gray-200 w-1/3">
              Cash Balance Before Cash Profit deduction
            </span>
            <span className="text-white font-bold w-1/3 text-right">
              ${cashProfit}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white text-base sm:text-lg dark:text-gray-200 w-1/3">
              Cash Profit
            </span>
            <span className="text-white font-bold w-1/3 text-right">
              ${cashProfit - cashBalance}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white text-base sm:text-lg dark:text-gray-200 w-1/3">
              Card Profit
            </span>
            <span className="text-white font-bold w-1/3 text-right">
              ${cardProfit}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white text-base sm:text-lg dark:text-gray-200 w-1/3">
              Other Profit
            </span>
            <span className="text-white font-bold w-1/3 text-right">
              ${otherProfit}
            </span>
          </div>
          <div className="border-b-2" />
          <div className="flex items-center justify-between">
            <span className="text-white text-base sm:text-lg dark:text-gray-200 w-1/3">
              Total Profit
            </span>
            <span className="text-white font-bold w-1/3 text-right">
              ${cashProfit - cashBalance + cardProfit + otherProfit}
            </span>
          </div>
          <div className="border-b-2" />
          <div className="flex items-center justify-between">
            <span className="text-white text-base sm:text-lg dark:text-gray-200 w-1/3">
              Started from
            </span>
            <span className="text-white font-bold w-1/3 text-right"></span>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Link
            href="#top"
            onClick={() => setStep((prev) => prev - 1)}
            className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
          >
            Previous
          </Link>
          <button
            onClick={submitCashup}
            className="px-6 py-2 leading-5 w-32 text-white transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:bg-gray-600"
          >
            Submit
          </button>
        </div>
      </section>
    </>
  );
};

export default Summary;
