import React, { useEffect, useState } from "react";
import { CardInput } from "./CashupForm";
import { BASE_URL } from "../../constant/config";
import { Payment } from "../../config/type";
import Link from "next/link";

interface CardProps {
  input: CardInput;
  setInput: React.Dispatch<React.SetStateAction<CardInput>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  cardSubtotal: number;
}

const Card = ({ input, setInput, setStep, cardSubtotal }: CardProps) => {

  return (
    <>
      <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
        <div className="flex justify-between flex-wrap">
          <h1 className="text-xl font-bold text-white capitalize dark:text-white">
            Cash Payment
          </h1>
          <p className="text-white">
            Subtotal: <span className="font-bold">${cardSubtotal}</span>
          </p>
        </div>
        <form>
          <div className="grid grid-cols-1 gap-6 mt-4 ">
            <div className="flex items-center justify-between">
              <label
                className="text-white text-base sm:text-lg dark:text-gray-200 w-1/3"
                htmlFor="username"
              >
                Debit Card
              </label>
              <input
                id="username"
                type="number"
                className="block w-1/3 p-1 text-right sm:p-2 text-sm sm:text-lg text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={input.debit}
                min={0}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    debit: Number(e.target.value),
                  }))
                }
              />
              <span className="text-white font-bold w-1/3 text-right">
                ${input.debit}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <label
                className="text-white text-base sm:text-lg dark:text-gray-200 w-1/3"
                htmlFor="username"
              >
                Credit Card
              </label>
              <input
                id="username"
                type="number"
                className="block w-1/3 p-1 text-right sm:p-2 text-sm sm:text-lg text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={input.credit}
                min={0}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    credit: Number(e.target.value),
                  }))
                }
              />
              <span className="text-white font-bold w-1/3 text-right">
                ${input.credit}
              </span>
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
            <Link
              href="#top"
              onClick={() => setStep((prev) => prev + 1)}
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
            >
              Next
            </Link>
          </div>
        </form>
      </section>
    </>
  );
};

export default Card;
