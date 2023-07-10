import { useRouter } from "next/router";
import React from "react";

const Transaction = () => {
  const router = useRouter();
  const id = router.query.id;

  return <div className="bg-[#002A53] w-screen h-screen ">
      
    {id}</div>;
};

export default Transaction;
