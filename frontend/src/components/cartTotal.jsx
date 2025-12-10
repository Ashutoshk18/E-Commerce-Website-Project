import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router';

const CartTotal = () => {
  const { currency, delivery_fee, getCartTotal, cartItems } = useContext(ShopContext);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculateTotal = async () => {
      const cartTotal = await getCartTotal();
      setSubtotal(cartTotal);
      setTotal(cartTotal + delivery_fee);
    };
    calculateTotal();
  }, [getCartTotal, delivery_fee, cartItems]);

  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-gray-50">
      <h2 className="text-xl font-medium mb-4">Cart Totals</h2>
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
      <Link
        to="/login"
        className="block w-full bg-black text-white text-center py-3 px-6 hover:bg-gray-800 transition-colors rounded"
      >
        PROCEED TO CHECKOUT
      </Link>
    </div>
  );
};

export default CartTotal;
