import React from "react";
import Navbar from "../../components/Navbar";
import LineChart from "../../components/Sale/LineChart";
import { BASE_URL } from "../../constant/config";
import { MenuItem, Payment } from "../../config/type";
import { GetServerSideProps } from "next";
import PaymentChart from "../../components/Sale/PaymentChart";
import MenuItemChart from "../../components/Sale/MenuItemChart";

interface SalesProps {
  menuItems: MenuItem[];
  payments: Payment[];
}

const index = ({ menuItems, payments }: SalesProps) => {
  console.log(menuItems)
  console.log(payments)
  return (
    <div className="bg-[#002A53] w-screen min-h-screen flex ">
      <Navbar />
      <div className="grow h-full overflow-auto">
        <h1 className="text-white text-2xl text-center my-4">Sales</h1>
        <div className="w-full h-1/2 flex">
          <PaymentChart data={payments} />
          <MenuItemChart data={menuItems} />

        </div>
      </div>
    </div>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps<{
  menuItems: MenuItem[];
  payments: Payment[]
}> = async () => {
  const result = await fetch(`${BASE_URL}/api/menu/menu`);
  const menuItems = await result.json();
  const result2 = await fetch(`${BASE_URL}/api/payment/payment`);
  const payments = await result2.json();

  return {
    props: {
      menuItems,
      payments
    },
  };
};
