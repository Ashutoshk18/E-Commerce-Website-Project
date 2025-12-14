import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    const getOrdinal = (n) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };
    
    return `${month} ${getOrdinal(day)}, ${year}`;
  };

  const firstFourProducts = products.slice(0, 4);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl mb-8">
        <Title text1="My" text2="Orders" />
      </div>

      <div className="space-y-4">
        {firstFourProducts.length === 0 ? (
          <p className="text-gray-500">No orders found</p>
        ) : (
          firstFourProducts.map((item, index) => {
            return (
              <div
                key={item._id}
                className="py-4 border-b border-gray-200 text-gray-700 flex flex-col md:flex-row md:items-center gap-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-6 flex-1">
                  <img
                    className="w-20 sm:w-24 h-20 sm:h-24 object-cover rounded"
                    src={item.image[0]}
                    alt={item.name}
                  />
                  <div className="flex-1">
                    <p className="sm:text-base font-medium text-gray-900 mb-2">
                      {item.name}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-600">
                      <p className="text-lg font-semibold text-gray-900">
                        {currency}{item.price}
                      </p>
                      <p className="">Quantity: 1</p>
                      <p className="">Size: {item.sizes[0] || "M"}</p>
                    </div>
                    <p className="mt-2 text-sm">
                      Date: <span className="text-gray-400">{formatDate(item.date)}</span>
                    </p>
                  </div>
                </div>
                <div className="md:text-center md:min-w-[150px]">
                  <p className="text-sm text-gray-500 mb-1">Delivery Status</p>
                  <p className="text-sm font-medium text-blue-600">Ready to Ship</p>
                </div>
                <div className="md:min-w-[120px]">
                  <button className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium">
                    Track Order
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Orders;
