import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import { TableType, TransactionType } from "../../config/type";

interface TableProps {
  table: TableType;
  setPopupOpen: Dispatch<SetStateAction<string | null>>;
  setSelectedTable: Dispatch<SetStateAction<TableType | null>>;
  transaction?: TransactionType;
}

const Table = ({
  table,
  setPopupOpen,
  setSelectedTable,
  transaction,
}: TableProps) => {
  const router = useRouter();
  const openTableDetail = () => {
    if (!table.isParticipated) {
      setPopupOpen(table.name);
      setSelectedTable(table);
    } else {
      router.push(`/transaction/${table.isParticipated}`);
    }
  };

  return (
    <button
      type="button"
      onClick={openTableDetail}
      className={`flex justify-center items-center rounded-md w-28 h-16 sm:w-32 sm:h-24 md:w-44 ${
        table.isParticipated.length
          ? "bg-blue-400 text-gray-50"
          : "bg-[#f1f1f1]"
      } mx-2 sm:mx-6 mb-4 sm:mb-0 p-4 text-center`}
    >
      <h2 className="font-bold text-base sm:text-lg md:text-xl">
        {table.name}
      </h2>
    </button>
  );
};

export default Table;
