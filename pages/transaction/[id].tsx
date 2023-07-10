import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { prisma } from "../../db";
import Navbar from "../../components/Transaction/Navbar";
import { BASE_URL } from "../constant/config";
import { Categories } from "../../config/type";
import Link from "next/link";

const Transaction = () => {
  const router = useRouter();
  const id = router.query.id;
  const [selectedCategory, setSelectedCategory] = useState("Breakfast");
  const [categories, setCategories] = useState<Categories[] | []>([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/categories/categories`)
      .then((res) => res.json())
      .then((res) => setCategories(res));
  }, []);
  return (
    <div className="bg-[#002A53] w-screen h-screen ">
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
      <div></div>
    </div>
  );
};

export default Transaction;
