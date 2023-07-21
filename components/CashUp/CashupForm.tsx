"use client";
import React, { useEffect, useState } from "react";
import Cash from "./Cash";
import Card from "./Card";
import { Payment } from "../../config/type";
import { BASE_URL } from "../../constant/config";
import Other from "./Other";
import Summary from "./Summary";
import Success from "./Success";

export interface CashInput {
  hundred: number;
  fifty: number;
  twenty: number;
  ten: number;
  five: number;
  two: number;
  one: number;
  fiftyCents: number;
  twentyCents: number;
  tenCents: number;
}

export interface CardInput {
  debit: number;
  credit: number;
}

const CashupForm = () => {
  const [cashInput, setCashInput] = useState<CashInput>({
    hundred: 0,
    fifty: 0,
    twenty: 0,
    ten: 0,
    five: 0,
    two: 0,
    one: 0,
    fiftyCents: 0,
    twentyCents: 0,
    tenCents: 0,
  });
  const [cashSubtotal, setCashSubtotal] = useState<number>(0);
  const [cardInput, setCardInput] = useState<CardInput>({
    debit: 0,
    credit: 0,
  });
  const [cardSubtotal, setCardSubtotal] = useState(0);
  const [otherInput, setOtherInput] = useState<number>(0);
  const [step, setStep] = useState(5);

  useEffect(() => {
    fetch(`${BASE_URL}/api/payment/withCurrentCashup`)
      .then((res) => res.json())
      .then((res) => {
        setCardInput((prev) => ({
          ...prev,
          debit: res
            .filter((p: Payment) => p.method === "card")
            .reduce((acc: number, curr: Payment) => (acc += curr.amount), 0),
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setCardSubtotal(
      Object.values(cardInput).reduce((acc, curr) => (acc += curr), 0)
    );
  }, [cardInput]);

  useEffect(() => {
    calculateSubTotal();
  }, [cashInput]);

  const calculateSubTotal = () => {
    let subtotal = 0;
    for (const key in cashInput) {
      switch (key) {
        case "hundred":
          subtotal += cashInput[key] * 100;
          break;
        case "fifty":
          subtotal += cashInput[key] * 50;
          break;
        case "twenty":
          subtotal += cashInput[key] * 20;
          break;
        case "ten":
          subtotal += cashInput[key] * 10;
          break;
        case "five":
          subtotal += cashInput[key] * 5;
          break;
        case "two":
          subtotal += cashInput[key] * 2;
          break;
        case "one":
          subtotal += cashInput[key] * 1;
          break;
        case "fiftyCents":
          subtotal += cashInput[key] * 0.5;
          break;
        case "twentyCents":
          subtotal += cashInput[key] * 0.2;
          break;
        case "tenCents":
          subtotal += cashInput[key] * 0.1;
          break;
      }
    }
    setCashSubtotal(subtotal);
  };

  return (
    <div id="top">
      <div>
        {step === 0 && (
          <div>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setStep((prev) => prev + 1)}
                className="py-2.5 px-5 mr-2 w-48 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Start Cash Up
              </button>
            </div>
          </div>
        )}
        {step === 1 && (
          <Cash
            cashSubtotal={cashSubtotal}
            input={cashInput}
            setInput={setCashInput}
            setStep={setStep}
          />
        )}
        {step === 2 && (
          <Card
            cardSubtotal={cardSubtotal}
            input={cardInput}
            setInput={setCardInput}
            setStep={setStep}
          />
        )}
        {step === 3 && (
          <Other
            input={otherInput}
            setInput={setOtherInput}
            setStep={setStep}
          />
        )}
        {step === 4 && (
          <Summary
            setStep={setStep}
            cashProfit={cashSubtotal}
            cardProfit={cardSubtotal}
            otherProfit={otherInput}
          />
        )}
        {step === 5 && (
          <Success />
        )}
      </div>
    </div>
  );
};

export default CashupForm;
