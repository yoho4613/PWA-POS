import React from "react";
import { Cart, TransactionType } from "../../config/type";

interface CartProps {
  cart: Cart[];
  setCart: React.Dispatch<React.SetStateAction<Cart[]>>;
  transaction: TransactionType;
}

const Cart = ({ cart, setCart, transaction }: CartProps) => {
  console.log(transaction);
  return (
    <div className="bg-gray-200 h-full w-full text-center">
      <div className="flex justify-between px-2 py-4">
        <h2>#{transaction.id}</h2>
        <h4>{transaction.customerName}</h4>
        <p>({transaction.people})</p>
      </div>
      <ul className="flex mb-4 justify-between px-4 py-2 font-bold">
        <li>Item</li>
        <li>Qty</li>
        <li>Price</li>
      </ul>
      <ul className="flex border-b-2 bg-gray-50 px-2 py-4 justify-between">
        <li className="font-bold">Burger</li>
        <li>3</li>
        <li>$24</li>
      </ul>
      {transaction.order && (
        transaction.order.map((o) => (
          <ul className="flex border-b-2 bg-gray-50 px-2 py-4 justify-between">
          <li className="font-bold">{o.menuItem}</li>
          <li>{o.quantity}</li>
          <li></li>
        </ul>
        ))
      )}
    </div>
  );
};

export default Cart;
