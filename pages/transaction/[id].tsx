import React, { useState } from "react";
import Navbar from "../../components/Transaction/Navbar";
import { BASE_URL } from "../constant/config";
import {
  Categories,
  MenuItem,
  Order,
  TransactionType,
} from "../../config/type";
import Link from "next/link";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Searchbar from "../../components/Searchbar";
import Cart from "../../components/Transaction/Cart";
import MenuPopup from "../../components/Transaction/MenuPopup";

export interface SelectedCategory {
  label: string;
  value: string;
}

const Transaction = ({
  categories,
  menuItems,
  transaction,
  orders,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [selectedCategory, setSelectedCategory] = useState<SelectedCategory>({
    label: "all",
    value: "",
  });
  const [filter, setFilter] = useState("");
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [cartForm, setCartForm] = useState({ id: "", quantity: 1 });
  const [cart, setCart] = useState<{ menuItem: MenuItem; quantity: number }[]>(
    []
  );

  return (
    <div className="bg-[#002A53] w-screen  ">
      <div className="flex h-screen flex-col ">
        <div className="flex px-4 bg-gray-400">
          <div className="grow">
            <Navbar
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          <div className="flex items-center">
            <Link href="/">
              <svg
                className="inline-block text-white h-12 bg-gray-500 w-16 p-2 hover:text-gray-700 rounded-lg hover:bg-gray-300 outline-0 border-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M5.828 7l2.536 2.536L6.95 10.95 2 6l4.95-4.95 1.414 1.414L5.828 5H13a8 8 0 110 16H4v-2h9a6 6 0 100-12H5.828z" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="flex grow">
          <div className="grow relative">
            {selectedMenu && (
              <MenuPopup
                selectedMenu={selectedMenu}
                setSelectedMenu={setSelectedMenu}
                cartForm={cartForm}
                setCartForm={setCartForm}
                setCart={setCart}
              />
            )}
            <div>
              <Searchbar filter={filter} setFilter={setFilter} />
            </div>
            <div className="flex flex-wrap justify-evenly">
              {menuItems
                .filter((menuItem) =>
                  filter.length
                    ? menuItem.name.toLowerCase().includes(filter)
                    : true
                )
                .filter((menuItem) =>
                  selectedCategory.value.length
                    ? menuItem.categories.includes(selectedCategory.value)
                    : true
                )
                .map((menuItem) => (
                  <button
                    className="p-4 w-48 h-20 bg-gray-100 font-bold hover:bg-gray-200 rounded-lg mb-6 "
                    key={menuItem.id}
                    onClick={() => setSelectedMenu(menuItem)}
                  >
                    {menuItem.name}
                  </button>
                ))}
            </div>
          </div>
          <div className="h-full w-1/3">
            <Cart
              orders={orders}
              cart={cart}
              setCart={setCart}
              transaction={transaction}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;

export const getServerSideProps: GetServerSideProps<{
  menuItems: MenuItem[];
  categories: Categories[];
  transaction: TransactionType;
  orders: Order[];
}> = async ({ query }) => {
  const result = await fetch(`${BASE_URL}/api/menu/menu`);
  const menuItems = await result.json();
  const result2 = await fetch(`${BASE_URL}/api/categories/categories`);
  const categories = await result2.json();
  const result3 = await fetch(`${BASE_URL}/api/transaction/${query.id}`);
  const transaction = await result3.json();
  const result4 = await fetch(`${BASE_URL}/api/order/${query.id}`);
  const orders = await result4.json();

  return {
    props: {
      menuItems,
      categories,
      transaction,
      orders,
    },
  };
};
