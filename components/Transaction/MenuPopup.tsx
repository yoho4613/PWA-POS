import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { MenuItem } from "../../config/type";

interface MenuPopupProps {
  selectedMenu: MenuItem;
  setSelectedMenu: React.Dispatch<React.SetStateAction<MenuItem | null>>;
  cartForm: { id: string; quantity: number };
  setCartForm: React.Dispatch<
    React.SetStateAction<{ id: string; quantity: number }>
  >;
  setCart: React.Dispatch<
    React.SetStateAction<{ menuItem: MenuItem; quantity: number }[]>
  >;
}

const MenuPopup = ({
  selectedMenu,
  setSelectedMenu,
  cartForm,
  setCartForm,
  setCart,
}: MenuPopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        if (popupRef.current && !popupRef.current.contains(e.target)) {
          setSelectedMenu(null);
          document.removeEventListener("mousedown", handleClickOutside);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={popupRef}
      className="absolute p-4 -translate-x-1/2 -translate-y-1/2 bg-gray-200 top-1/2 left-1/2 w-1/2 rounded-md"
    >
      <div className="text-right mb-4">
        <button onClick={() => setSelectedMenu(null)}>
          <svg fill="none" viewBox="0 0 24 24" className="w-10 h-10">
            <path
              fill="currentColor"
              d="M16.396 7.757a1 1 0 010 1.415l-2.982 2.981 2.676 2.675a1 1 0 11-1.415 1.415L12 13.567l-2.675 2.676a1 1 0 01-1.415-1.415l2.676-2.675-2.982-2.981A1 1 0 119.02 7.757L12 10.74l2.981-2.982a1 1 0 011.415 0z"
            />
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M4 1a3 3 0 00-3 3v16a3 3 0 003 3h16a3 3 0 003-3V4a3 3 0 00-3-3H4zm16 2H4a1 1 0 00-1 1v16a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">{selectedMenu.name}</h2>
        <div className="flex items-center h-full">
          <button
            onClick={() =>
              setCartForm((prev) => ({
                ...prev,
                quantity: prev.quantity + 1,
              }))
            }
          >
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              className="w-8 h-8 p-1 bg-gray-400 rounded-lg hover:bg-gray-500"
            >
              <path d="M868 545.5L536.1 163a31.96 31.96 0 00-48.3 0L156 545.5a7.97 7.97 0 006 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z" />
            </svg>
          </button>
          <input
            className="w-10 text-center mx-2 p-1.5 rounded-md border border-cyan-600"
            name="quantity"
            id="quantity"
            type="tel"
            onChange={(e) =>
              setCartForm({
                ...cartForm,
                quantity: Number(e.target.value),
              })
            }
            value={cartForm.quantity}
          />
          <button
            onClick={() =>
              setCartForm((prev) => ({
                ...prev,
                quantity: prev.quantity > 1 ? prev.quantity - 1 : 1,
              }))
            }
          >
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              className="w-8 h-8 p-1 bg-gray-400 rounded-lg hover:bg-gray-500"
            >
              <path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0048.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex justify-center h-24 m-6">
        <Image
          src={selectedMenu.url}
          alt={selectedMenu.name}
          width={100}
          height={100}
        />
      </div>
      <p className="mb-4">{selectedMenu.description}</p>
      <div className="text-center">
        <button
          type="button"
          onClick={() => {
            setCart((prev) => [
              ...prev,
              { menuItem: selectedMenu, quantity: cartForm.quantity },
            ]);
            setSelectedMenu(null);
          }}
          className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add Order
        </button>
      </div>
    </div>
  );
};

export default MenuPopup;
