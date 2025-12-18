import { createContext, useState, useEffect } from "react";
// import { products } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const ShopContext = createContext();
const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);
    if (!size) {
      toast.error("Please select a size");
      return;
    }
    if (cartData[itemId] && cartData[itemId][size]) {
      cartData[itemId][size]++;
    } else if (cartData[itemId] && !cartData[itemId][size]) {
      cartData[itemId][size] = 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const incrementCartItem = (itemId, size) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId] && cartData[itemId][size]) {
      cartData[itemId][size]++;
    }
    setCartItems(cartData);
  };

  const decrementCartItem = (itemId, size) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId] && cartData[itemId][size]) {
      cartData[itemId][size]--;

      if (cartData[itemId][size] === 0) {
        const product = products.find((p) => p._id === itemId);
        const confirmRemove = window.confirm(
          `Do you want to remove "${
            product?.name || "this item"
          }" (Size: ${size}) from your cart?`
        );

        if (confirmRemove) {
          delete cartData[itemId][size];

          if (Object.keys(cartData[itemId]).length === 0) {
            delete cartData[itemId];
          }
          toast.success("Item removed from cart");
        } else {
          cartData[itemId][size] = 1;
        }
      }
    }
    setCartItems(cartData);
  };

  const removeCartItem = (itemId, size) => {
    const product = products.find((p) => p._id === itemId);
    const confirmRemove = window.confirm(
      `Do you want to remove "${
        product?.name || "this item"
      }" (Size: ${size}) from your cart?`
    );

    if (confirmRemove) {
      let cartData = structuredClone(cartItems);
      if (cartData[itemId] && cartData[itemId][size]) {
        delete cartData[itemId][size];

        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
        setCartItems(cartData);
        toast.success("Item removed from cart");
      }
    }
  };

  // useEffect(() => {
  //   console.log(cartItems);
  // }, [cartItems]);

  const getCartCount = () => {
    let count = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        try {
          if (cartItems[itemId][size] > 0) {
            count += cartItems[itemId][size];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return count;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      let itemInfo = products.find((product) => product._id === itemId);
      // console.log(itemInfo);
      for (const size in cartItems[itemId]) {
        try {
          if (cartItems[itemId][size] > 0) {
            totalAmount += cartItems[itemId][size] * itemInfo.price;
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalAmount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  const value = {
    products,
    delivery_fee,
    currency,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    incrementCartItem,
    decrementCartItem,
    removeCartItem,
    updateQuantity,
    getCartCount,
    getCartAmount,
    setCartItems,
    navigate,
    backendUrl,
    token,
    setToken,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
export default ShopContextProvider;
