import React, { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import CartTotal from "../components/cartTotal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, delivery_fee } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || 
        !formData.address || !formData.city || !formData.state || !formData.zip || !formData.country) {
      toast.error("Please fill in all delivery information fields");
      return;
    }

    if (!formData.paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    // Validate payment details based on selected method
    if (formData.paymentMethod === "upi" && !formData.upiId) {
      toast.error("Please enter your UPI ID");
      return;
    }
    
    if ((formData.paymentMethod === "credit" || formData.paymentMethod === "debit") && 
        (!formData.cardNumber || !formData.expiryDate || !formData.cvv)) {
      toast.error("Please fill in all payment information fields");
      return;
    }

    if (Object.keys(cartItems).length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Simulate order placement
    toast.success("Order placed successfully!");
    setTimeout(() => {
      navigate("/orders");
    }, 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-10 pt-14 min-h-[80vh] border-t">
      <div className="flex flex-col gap-4 w-full lg:max-w-[600px]">
        <Title text1="DELIVERY" text2="INFORMATION" />
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded outline-none focus:border-black"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded outline-none focus:border-black"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded outline-none focus:border-black"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded outline-none focus:border-black"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded outline-none focus:border-black sm:col-span-2"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded outline-none focus:border-black"
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded outline-none focus:border-black"
              required
            />
            <input
              type="text"
              name="zip"
              placeholder="Zip Code"
              value={formData.zip}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded outline-none focus:border-black"
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded outline-none focus:border-black"
              required
            />
          </div>

          <div className="mt-6">
            <Title text1="PAYMENT" text2="INFORMATION" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            
            {(formData.paymentMethod === "credit" || formData.paymentMethod === "debit") && (
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
                  You will pay cash when your order is delivered. No payment details required.
                </p>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-black text-white py-3 px-8 rounded hover:bg-gray-800 transition-colors mt-6 w-full sm:w-auto"
          >
            PLACE ORDER
          </button>
        </form>
      </div>

      <div className="w-full lg:w-80">
        <CartTotal />
      </div>
    </div>
  );
};

export default PlaceOrder;


//Next task:- Create orders page UI