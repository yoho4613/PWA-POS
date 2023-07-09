import { Table } from "@prisma/client";
import React from "react";

const Table = ({ table }: { table: Table }) => {
  return (
    <div className="flex justify-center items-center rounded-md w-24 h-24 bg-[#f1f1f1] mx-6">
      <h2>{table.name}</h2>
    </div>
  );
};

export default Table;
