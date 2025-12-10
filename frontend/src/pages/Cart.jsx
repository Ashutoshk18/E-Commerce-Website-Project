import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/cartTotal";

const Cart = () => {
  const { products, cartItems, currency, incrementCartItem, decrementCartItem, removeCartItem } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
            name: products.find((product) => product._id === items).name,
            image: products.find((product) => product._id === items).image[0],
          });
        }
      }
    }
    setCartData(tempData);
    console.log(tempData);
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          {cartData.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            cartData.map((item, index) => (
              <div key={index} className="flex gap-4 mb-4 border-b pb-4 relative">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover" />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <p className="text-sm text-gray-500">Quantity:</p>
                    <div className="flex items-center gap-2 border border-gray-300 rounded">
                      <button
                        onClick={() => decrementCartItem(item._id, item.size)}
                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 min-w-[2rem] text-center">{item.quantity}</span>
                      <button
                        onClick={() => incrementCartItem(item._id, item.size)}
                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 font-medium">
                    {currency}
                    {products.find((p) => p._id === item._id)?.price * item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => removeCartItem(item._id, item.size)}
                  className="absolute top-0 right-0 p-2 hover:bg-gray-100 rounded transition-colors"
                  title="Remove item"
                >
                  <img src={assets.bin_icon} alt="Remove" className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>
        {cartData.length > 0 && (
          <div className="lg:w-80 w-full">
            <CartTotal />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
