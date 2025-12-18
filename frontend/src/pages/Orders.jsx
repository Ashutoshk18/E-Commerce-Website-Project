import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backendUrl + "/api/order/userOrders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let allOrderItem = [];

        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrderItem.push(item);
          });
        });
        setOrderData(allOrderItem.reverse());
      }
    } catch (error) {}
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const weekDay = weekDays[date.getDay()];

    const getOrdinal = (n) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    return `${weekDay}, ${month} ${getOrdinal(day)}, ${year}`;
  };
  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl mb-8">
        <Title text1="My" text2="Orders" />
      </div>

      <div>
        {orderData.length === 0 ? (
          <p className="text-gray-500">No orders found</p>
        ) : (
          orderData.map((item, index) => {
            return (
              <div
                key={item._id}
                className="py-4 border-t border-b border-gray-200 text-gray-700 flex flex-col md:flex-row md:items-center gap-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-6 flex-1 text-sm">
                  <img
                    className="w-16  sm:w-20 h-20 sm:h-24 object-cover rounded"
                    src={item.image[0]}
                    alt={item.name}
                  />
                  <div className="flex-1">
                    <p className="sm:text-base font-medium text-gray-900 mb-2">
                      {item.name}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-base text-gray-700">
                      <p>
                        {currency}
                        {item.price}
                      </p>
                      <p className="">Quantity: {item.quantity}</p>
                      <p className="">Size: {item.size || "M"}</p>
                    </div>
                    <p className="mt-1 text-sm">
                      Date:{" "}
                      <span className="text-gray-400">
                        {formatDate(item.date)}
                      </span>
                    </p>
                    <p className="mt-1 text-sm">
                      Payment:{" "}
                      <span className="text-gray-400">
                        {item.paymentMethod}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="md:text-center md:min-w-[150px]">
                  <p className="text-sm text-gray-500 mb-1">Delivery Status</p>
                  <p className="text-sm font-medium text-blue-600">
                    {item.status}
                  </p>
                </div>
                <div className="md:min-w-[120px]">
                  <button
                    onClick={loadOrderData}
                    className="w-full cursor-pointer md:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
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
