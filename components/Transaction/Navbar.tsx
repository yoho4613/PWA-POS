import React from "react";
import { Categories } from "../../config/type";
import { SelectedCategory } from "../../pages/transaction/[id]";

interface NavbarProps {
  categories: Categories[] | null;
  selectedCategory: SelectedCategory;
  setSelectedCategory: React.Dispatch<React.SetStateAction<SelectedCategory>>;
}

const Navbar = ({
  categories,
  setSelectedCategory,
  selectedCategory,
}: NavbarProps) => {
  return (
    <div className=" h-24 flex items-center px-4">
      <ul className="grow hidden text-base font-medium text-center text-gray-500 divide-gray-200 sm:flex dark:text-gray-400">
        <li className="w-full mx-2">
          <button
            className={`inline-block w-full p-4 hover:text-gray-700 rounded-lg hover:bg-gray-50 outline-0 border-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 ${
              selectedCategory.label === "all"
                ? "bg-gray-200 font-bold"
                : "bg-white"
            }`}
            onClick={() => setSelectedCategory({ label: "all", value: "" })}
          >
            All
          </button>
        </li>
        {categories &&
          categories.map((category) => (
            <li key={category.id} className="w-full mx-2">
              <button
                className={`inline-block w-full p-4 hover:text-gray-700 rounded-lg hover:bg-gray-50 outline-0 border-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 ${
                  selectedCategory.label === category.name
                    ? "bg-gray-200 font-bold"
                    : "bg-white"
                }`}
                onClick={() =>
                  setSelectedCategory({
                    label: category.name,
                    value: category.id,
                  })
                }
              >
                {category.name}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Navbar;
