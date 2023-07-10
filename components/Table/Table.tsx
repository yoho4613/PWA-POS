import { Table } from "@prisma/client";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";

interface TableProps {
  table: Table;
  setPopupOpen: Dispatch<SetStateAction<string | null>>;
}

const Table = ({ table, setPopupOpen }: TableProps) => {
  const router = useRouter();
  const openTableDetail = () => {
    if (!table.isParticipated) {
      setPopupOpen(table.name);
    } else {
      router.push(`/transaction/${table.id}`);
    }
  };

  return (
    <button
      type="button"
      onClick={openTableDetail}
      className="flex justify-center items-center rounded-md w-24 h-24 sm:w-36 sm:h-36 md:w-44 bg-[#f1f1f1] mx-6 p-4 text-center"
    >
      <h2 className="font-bold text-base sm:text-lg md:text-xl">
        {table.name}
      </h2>
    </button>
  );
};

export default Table;
