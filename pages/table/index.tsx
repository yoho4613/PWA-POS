import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { BASE_URL } from "../../constant/config";
import { TableType } from "../../config/type";

const TablePage = () => {
  const [tables, setTables] = useState<TableType[]>([])
  const [locations, setLocations] = useState<string[]>([])

  useEffect(() => {
    fetch(`${BASE_URL}/api/table/table`).then(res => res.json()).then(res => setTables(res)).catch(err => new Error(err))
  }, [])

  useEffect(() => {
    if (tables) {
      const removeDuplication = Array.from(new Set(tables.map((table) => table.location)));
      setLocations(removeDuplication);
    }

  }, [tables]);


  return (
    <div className="bg-[#002A53] w-screen min-h-screen flex ">
      <Navbar />
      {/* <Toaster /> */}
      {/* {popup && <Popup label={popup} table={selectedTable} />} */}
      <div className="p-6 grow">
        <h1 className="mb-6 text-center text-white text-2xl font-bold">Manage Tables</h1>
        <button
          type="button"
          className="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => {
            // setSelectedTable(null);
            // setPopup("Add");
          }}
        >
          Add Table
        </button>

        {locations &&
          locations.map((location) => (
            <div
              key={location}
              className="mb-6 w-full rounded-md bg-slate-200 p-6"
            >
              <h3 className="mb-4 text-xl font-bold">{location}</h3>
              <div className="justify-evenly rounded-md">
                {tables &&
                  tables
                    .filter((table) => table.location === location)
                    .map((table) => (
                      <button
                        key={table.id}
                        type="button"
                        className="mb-2 mr-2 rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => {
                          // setSelectedTable(table);
                          // setPopup("Update");
                        }}
                      >
                        {table.name}{" "}
                        <span className="font-light">({table.capacity})</span>
                      </button>
                    ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TablePage;
