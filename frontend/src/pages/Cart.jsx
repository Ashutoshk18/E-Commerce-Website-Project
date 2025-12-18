import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/cartTotal";
import { Link } from "react-router";

const Cart = () => {
  const {
    products,
    cartItems,
    currency,
    incrementCartItem,
    decrementCartItem,
    removeCartItem,
    updateQuantity,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    if (!products || products.length === 0) return;

    const tempData = [];

    for (const items in cartItems) {
      const product = products.find((p) => p._id === items);
      if (!product) continue;

      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
            name: product.name,
            image: product.image[0],
          });
        }
      }
    }

    setCartData(tempData);
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>

      {/* <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          {cartData.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            cartData.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 mb-4 border-b pb-4 relative"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover"
                />
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
                      <span className="px-3 py-1 min-w-8 text-center">
                        {item.quantity}
                      </span>
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
                    {products.find((p) => p._id === item._id)?.price *
                      item.quantity}
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
      </div> */}
      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );
          return (
            <div
              key={index}
              className="py-4 border-t broder-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items=start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={productData.image[0]}
                  alt=""
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value)
                      )
                }
                type="number"
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="cursor-pointer mr-4 w-4 sm:w-5"
                src={assets.bin_icon}
                alt=""
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="border w-full sm:w-[450px] border-gray-300 rounded-lg p-6 bg-gray-50">
          <CartTotal />
          <div className="w-full text-end">
            <Link
              to="/placeorder"
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
