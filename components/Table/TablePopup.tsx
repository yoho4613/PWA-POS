import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { BASE_URL } from "../../pages/constant/config";
import { TableType } from "../../config/type";

interface TablePopupProps {
  selectedTable: TableType | null;
  setPopupOpen: Dispatch<SetStateAction<string | null>>;
}

const TablePopup = ({ selectedTable, setPopupOpen }: TablePopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        if (popupRef.current && !popupRef.current.contains(e.target)) {
          setPopupOpen(null);
          document.removeEventListener("mousedown", handleClickOutside);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  // const [form, setForm] = useState({ customerName: "", people: 0 });

  // const handleSubmit = async () => {
  //   const response = await fetch("/api/transaction/transaction", {
  //     method: "POST",
  //     body: JSON.stringify(form),
  //   }).then((res) => {
  //     setPopupOpen(false);
  //     return res.json();
  //   });
  // };

  return (
    <div ref={popupRef}>
      <form method="POST" action={`${BASE_URL}/api/transaction/transaction`}>
        <div className="text-center  font-bold text-lg">{selectedTable?.name}</div>
        <input className="hidden" name="tableId" type="text" defaultValue={selectedTable?.id} />
        <div className="mb-4">
          <label
            htmlFor="customer_name"
            className="block mb-2 text-md font-bold text-gray-900 dark:text-white"
          >
            Customer Name
          </label>
          <input
            type="text"
            id="customer_name"
            name="customerName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            // value={form.customerName}
            // onChange={(e) => setForm({ ...form, customerName: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="people"
            className="block mb-2 text-md font-bold text-gray-900 dark:text-white"
          >
            People
          </label>
          <input
            type="number"
            id="people"
            name="people"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="5"
            // value={form.people}
            // onChange={(e) =>
            //   setForm({ ...form, people: Number(e.target.value) })
            // }
          />
        </div>
        <button
          type="submit"
          // onClick={handleSubmit}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TablePopup;
