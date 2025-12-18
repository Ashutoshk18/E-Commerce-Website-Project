import React, { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/cartTotal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { assets } from "../assets/assets";

const PlaceOrder = () => {
  // const navigate = useNavigate();
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    phone: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });

  const [method, setMethod] = useState("cod");

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      console.log(orderItems);
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        //API Calls for Cod
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            console.log(session_url);
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message + "chai peelo");
          }
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Basic validation
  //   if (
  //     !formData.firstName ||
  //     !formData.lastName ||
  //     !formData.email ||
  //     !formData.phone ||
  //     !formData.address ||
  //     !formData.city ||
  //     !formData.state ||
  //     !formData.zip ||
  //     !formData.country
  //   ) {
  //     toast.error("Please fill in all delivery information fields");
  //     return;
  //   }

  //   if (!formData.paymentMethod) {
  //     toast.error("Please select a payment method");
  //     return;
  //   }

  //   // Validate payment details based on selected method
  //   if (formData.paymentMethod === "upi" && !formData.upiId) {
  //     toast.error("Please enter your UPI ID");
  //     return;
  //   }

  //   if (
  //     (formData.paymentMethod === "credit" ||
  //       formData.paymentMethod === "debit") &&
  //     (!formData.cardNumber || !formData.expiryDate || !formData.cvv)
  //   ) {
  //     toast.error("Please fill in all payment information fields");
  //     return;
  //   }

  //   if (Object.keys(cartItems).length === 0) {
  //     toast.error("Your cart is empty");
  //     return;
  //   }

  //   // Simulate order placement
  //   toast.success("Order placed successfully!");
  //   setTimeout(() => {
  //     navigate("/orders");
  //   }, 2000);
  // };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* -------- Left Side ------------ */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={onChangeHandler}
              className="border border-gray-300 px-4 py-2 rounded outline-none focus:border-black"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={onChangeHandler}
              className="border border-gray-300 px-4 py-2 rounded outline-none focus:border-black"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={onChangeHandler}
              className="border border-gray-300 px-4 py-2 rounded outline-none focus:border-black"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={onChangeHandler}
              className="border border-gray-300 px-4 py-2 rounded outline-none focus:border-black"
              required
            />
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={formData.street}
              onChange={onChangeHandler}
              className="border border-gray-300 px-4 py-2 rounded outline-none focus:border-black sm:col-span-2"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={onChangeHandler}
              className="border border-gray-300 px-4 py-2 rounded outline-none focus:border-black"
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={onChangeHandler}
              className="border border-gray-300 px-4 py-2 rounded outline-none focus:border-black"
              required
            />
            <input
              type="text"
              name="zipcode"
              placeholder="Zip Code"
              value={formData.zipcode}
              onChange={onChangeHandler}
              className="border border-gray-300 px-4 py-2 rounded outline-none focus:border-black"
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={onChangeHandler}
              className="border border-gray-300 px-4 py-2 rounded outline-none focus:border-black"
              required
            />
          </div>
        </div>
      </div>
      {/* ----------Right side ---------- */}
      <div>
        <div className="mt-8">
          <div className="mt-8 min-w-80 border w-full sm:w-[450px] border-gray-300 rounded-lg p-6 bg-gray-50">
            <CartTotal />
          </div>
          <div className="mt-12">
            <Title text1="PAYMENT" text2="INFORMATION" />
            {/* ---------------Payment Method Selection------------- */}
            <div className="flex gap-3 flex-col lg:flex-row">
              {/* Stripe */}
              <div
                onClick={() => setMethod("stripe")}
                className={`flex items-center gap-3 cursor-pointer border rounded-lg px-4 py-3 transition-all
      ${
        method === "stripe"
          ? "border-green-500 bg-green-50"
          : "border-slate-200 hover:border-slate-300"
      }`}
              >
                <span
                  className={`w-4 h-4 rounded-full border
        ${
          method === "stripe"
            ? "bg-green-500 border-green-500"
            : "border-slate-300"
        }
      `}
                />
                <img
                  className="h-5 ml-3"
                  src={assets.stripe_logo}
                  alt="Stripe"
                />
              </div>

              {/* Razorpay */}
              <div
                onClick={() => setMethod("razorpay")}
                className={`flex items-center gap-3 cursor-pointer
      border rounded-lg px-4 py-3
      transition-all
      ${
        method === "razorpay"
          ? "border-green-500 bg-green-50"
          : "border-slate-200 hover:border-slate-300"
      }`}
              >
                <span
                  className={`w-4 h-4 rounded-full border
        ${
          method === "razorpay"
            ? "bg-green-500 border-green-500"
            : "border-slate-300"
        }
      `}
                />
                <img
                  className="h-5 ml-3"
                  src={assets.razorpay_logo}
                  alt="Razorpay"
                />
              </div>

              {/* COD */}
              <div
                onClick={() => setMethod("cod")}
                className={`flex items-center gap-3 cursor-pointer
      border rounded-lg px-4 py-3
      transition-all
      ${
        method === "cod"
          ? "border-green-500 bg-green-50"
          : "border-slate-200 hover:border-slate-300"
      }`}
              >
                <span
                  className={`w-4 h-4 rounded-full border
        ${
          method === "cod"
            ? "bg-green-500 border-green-500"
            : "border-slate-300"
        }
      `}
                />
                <p className="text-sm font-medium text-gray-700">
                  CASH ON DELIVERY
                </p>
              </div>
            </div>
            <div className="w-full text-end mt-8">
              <button
                type="submit"
                className="bg-black cursor-pointer text-white py-3 px-16 text-sm rounded hover:bg-gray-800 transition-colors w-full sm:w-auto"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded outline-none focus:border-black sm:col-span-2"
            required
          >
            <option value="">Select Payment Method</option>
            <option value="cash">Cash on Delivery</option>
            <option value="upi">UPI</option>
            <option value="credit">Credit Card</option>
            <option value="debit">Debit Card</option>
          </select>

          {formData.paymentMethod === "upi" && (
            <input
              type="text"
              name="upiId"
              placeholder="UPI ID (e.g., yourname@paytm)"
              value={formData.upiId}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded outline-none focus:border-black sm:col-span-2"
              required
            />
          )}

          {(formData.paymentMethod === "credit" ||
            formData.paymentMethod === "debit") && (
            <>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleChange}
                maxLength="16"
                className="border border-gray-300 px-4 py-2 rounded outline-none focus:border-black sm:col-span-2"
                required
              />
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleChange}
                maxLength="5"
                className="border border-gray-300 px-4 py-2 rounded outline-none focus:border-black"
                required
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={handleChange}
                maxLength="3"
                className="border border-gray-300 px-4 py-2 rounded outline-none focus:border-black"
                required
              />
            </>
          )}

          {formData.paymentMethod === "cash" && (
            <div className="sm:col-span-2 p-4 bg-green-50 border border-green-200 rounded">
              <p className="text-sm text-green-700">
                You will pay cash when your order is delivered. No payment
                details required.
              </p>
            </div>
          )}
        </div> */}
      </div>
    </form>
  );
};

export default PlaceOrder;

//Next task:- Create orders page UI
