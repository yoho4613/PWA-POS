import React, { useEffect, useState } from "react";
import { CashInput } from "./CashupForm";
import Link from "next/link";

interface CashProps {
  input: CashInput;
  setInput: React.Dispatch<React.SetStateAction<CashInput>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  cashSubtotal: number
}

const Cash = ({ input, setInput, setStep, cashSubtotal }: CashProps) => {



  return (
    <>
      <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 ">
        <div className="flex justify-between flex-wrap">
          <h1 className="text-xl font-bold text-white capitalize dark:text-white">
            Cash Balance
          </h1>
          <p className="text-white">
            Subtotal: <span className="font-bold">${cashSubtotal}</span>
          </p>
        </div>
        <form>
          <div className="grid grid-cols-1 gap-6 mt-4 ">
            <div className="flex items-center justify-between">
              <label
                className="text-white text-base sm:text-lg dark:text-gray-200 w-1/3"
                htmlFor="username"
              >
                $100
              </label>
              <input
                id="username"
                type="number"
                className="block w-1/3 p-1 text-right sm:p-2 text-sm sm:text-lg text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={input.hundred}
                min={0}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    hundred: Number(e.target.value),
                  }))
                }
              />
              <span className="text-white font-bold w-1/3 text-right">
                ${input.hundred * 100}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <label
                className="text-white text-base sm:text-lg dark:text-gray-200 w-1/3"
                htmlFor="username"
              >
                $50
              </label>
              <input
                id="username"
                type="number"
                className="block w-1/3 p-1 text-right sm:p-2 text-sm sm:text-lg text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={input.fifty}
                min={0}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    fifty: Number(e.target.value),
                  }))
                }
              />
              <span className="text-white text-right font-bold w-1/3">
                ${input.fifty * 50}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <label
                className="text-white text-base sm:text-lg dark:text-gray-200 w-1/3"
                htmlFor="username"
              >
                $20
              </label>
              <input
                id="username"
                type="number"
                className="block w-1/3 p-1 text-right sm:p-2 text-sm sm:text-lg text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={input.twenty}
                min={0}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    twenty: Number(e.target.value),
                  }))
                }
              />
              <span className="text-white text-right font-bold w-1/3">
                ${input.twenty * 20}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <label
                className="text-white text-base sm:text-lg dark:text-gray-200 w-1/3"
                htmlFor="username"
              >
                $10
              </label>
              <input
                id="username"
                type="number"
                className="block w-1/3 p-1 text-right sm:p-2 text-sm sm:text-lg text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={input.ten}
                min={0}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    ten: Number(e.target.value),
                  }))
                }
              />
              <span className="text-white text-right font-bold w-1/3">
                ${input.ten * 10}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <label
                className="text-white text-base sm:text-lg dark:text-gray-200 w-1/3"
                htmlFor="username"
              >
                $5
              </label>
              <input
                id="username"
                type="number"
                className="block w-1/3 p-1 text-right sm:p-2 text-sm sm:text-lg text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={input.five}
                min={0}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    five: Number(e.target.value),
                  }))
                }
              />
              <span className="text-white text-right font-bold w-1/3">
                ${input.five * 5}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <label
                className="text-white text-base sm:text-lg dark:text-gray-200 w-1/3"
                htmlFor="username"
              >
                $2
              </label>
              <input
                id="username"
                type="number"
                className="block w-1/3 p-1 text-right sm:p-2 text-sm sm:text-lg text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={input.two}
                min={0}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    two: Number(e.target.value),
                  }))
                }
              />
              <span className="text-white text-right font-bold w-1/3">
                ${input.two * 2}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <label
                className="text-white text-base sm:text-lg dark:text-gray-200 w-1/3"
                htmlFor="username"
              >
                $1
              </label>
              <input
                id="username"
                type="number"
                className="block w-1/3 p-1 text-right sm:p-2 text-sm sm:text-lg text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={input.one}
                min={0}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    one: Number(e.target.value),
                  }))
                }
              />
              <span className="text-white text-right font-bold w-1/3">
                ${input.one * 1}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <label
                className="text-white text-base sm:text-lg dark:text-gray-200 w-1/3"
                htmlFor="username"
              >
                $0.50
              </label>
              <input
                id="username"
                type="number"
                className="block w-1/3 p-1 text-right sm:p-2 text-sm sm:text-lg text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={input.fiftyCents}
                min={0}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    fiftyCents: Number(e.target.value),
                  }))
                }
              />
              <span className="text-white text-right font-bold w-1/3">
                ${input.fiftyCents * 0.5}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <label
                className="text-white text-base sm:text-lg dark:text-gray-200 w-1/3"
                htmlFor="username"
              >
                $0.20
              </label>
              <input
                id="username"
                type="number"
                className="block w-1/3 p-1 text-right sm:p-2 text-sm sm:text-lg text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={input.twentyCents}
                min={0}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    twentyCents: Number(e.target.value),
                  }))
                }
              />
              <span className="text-white text-right font-bold w-1/3">
                ${(input.twentyCents * 0.2).toString().slice(0, 3)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <label
                className="text-white text-base sm:text-lg dark:text-gray-200 w-1/3"
                htmlFor="username"
              >
                $0.10
              </label>
              <input
                id="username"
                type="number"
                className="block w-1/3 p-1 text-right sm:p-2 text-sm sm:text-lg text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={input.tenCents}
                min={0}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    tenCents: Number(e.target.value),
                  }))
                }
              />
              <span className="text-white text-right font-bold w-1/3">
                ${(input.tenCents * 0.1).toString().slice(0, 3)}
              </span>
            </div>
          </div>

          <div className="flex justify-end mt-6">
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

export default Cash;
