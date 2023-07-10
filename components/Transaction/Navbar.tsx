import React from "react";
import { Categories } from "../../config/type";

interface NavbarProps {
  categories: Categories[] | null
  selectedCategory: string
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
}

const Navbar = ({ categories, setSelectedCategory, selectedCategory }: NavbarProps) => {
  return (
    <div className=" bg-gray-400 h-24 flex items-center px-4">
      <ul className="grow hidden text-sm font-medium text-center text-gray-500 divide-gray-200 sm:flex dark:text-gray-400">
        {categories && categories.map((category) => (
          <li key={category.id} className="w-full mx-2">
            <button
              className={`inline-block w-full p-4 hover:text-gray-700 rounded-lg hover:bg-gray-50 outline-0 border-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 ${
                selectedCategory === category.name ? "bg-gray-200 font-bold" : "bg-white"
              }`}
              onClick={() => setSelectedCategory(category.name)}
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
