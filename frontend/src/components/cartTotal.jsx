import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount, cartItems } =
    useContext(ShopContext);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculateTotal = async () => {
      const cartTotal = await getCartAmount();
      setSubtotal(cartTotal);
      setTotal(cartTotal + delivery_fee);
    };
    calculateTotal();
  }, [getCartAmount, delivery_fee, cartItems]);

  return (
    <div>
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <p className="text-gray-600">Subtotal:</p>
          <p className="font-medium">
            {currency}
            {subtotal.toFixed(2)}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Delivery Fee:</p>
          <p className="font-medium">
            {currency}
            {delivery_fee.toFixed(2)}
          </p>
        </div>
        <hr className="border-gray-300" />
        <div className="flex justify-between text-lg">
          <p className="font-semibold">Total:</p>
          <p className="font-semibold">
            {currency}
            {total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
