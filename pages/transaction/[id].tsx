import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { prisma } from "../../db";
import Navbar from "../../components/Transaction/Navbar";
import { BASE_URL } from "../constant/config";
import { Categories } from "../../config/type";

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
      <Navbar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div>
        
      </div>
    </div>
  );
};

export default Transaction;
