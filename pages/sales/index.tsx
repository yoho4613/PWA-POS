import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { BASE_URL } from "../../constant/config";
import { MenuItem, Payment } from "../../config/type";
import PaymentChart from "../../components/Sale/PaymentChart";
import MenuItemChart from "../../components/Sale/MenuItemChart";
import LineChart from "../../components/Sale/LineChart";

const Sales = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/menu/menu`)
      .then((res) => res.json())
      .then((res) => setMenuItems(res))
      .catch((err) => new Error(err));

    fetch(`${BASE_URL}/api/payment/payment`)
      .then((res) => res.json())
      .then((res) => setPayments(res))
      .catch((err) => new Error(err));
  }, []);
  return (
    <div className="bg-[#002A53] w-screen h-screen flex ">
      <Navbar />
      <div className="grow max-h-full overflow-auto ">
        <h1 className="text-white text-2xl text-center my-4">Sales</h1>
        <div className="w-32 p-4">
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="today">Today</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="total">Total</option>
          </select>
        </div>
        <div className="w-full h-1/2 flex">
          <div className="h-full">
            {payments && <PaymentChart data={payments} />}
          </div>
          <div className="h-full">
            {menuItems && <MenuItemChart data={menuItems} />}
          </div>
        </div>
        <div className="bg-gray-200">
          <h2 className="text-center font-bold">Profit</h2>
          {payments && <LineChart payments={payments} />}
        </div>
      </div>
    </div>
  );
};

export default Sales;

