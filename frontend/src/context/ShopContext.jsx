import { createContext, useState, useEffect } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();
const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);
    if (!size){
      toast.error("Please select a size");
      return;
    }
    if (cartData[itemId] && cartData[itemId][size]) {
      cartData[itemId][size]++;
    }
    else if (cartData[itemId] && !cartData[itemId][size]) {
      cartData[itemId][size] = 1;
    }
    else {
      cartData[itemId] = { [size]: 1 };
    }
    setCartItems(cartData);
  }

  const incrementCartItem = (itemId, size) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId] && cartData[itemId][size]) {
      cartData[itemId][size]++;
    }
    setCartItems(cartData);
  }

  const decrementCartItem = (itemId, size) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId] && cartData[itemId][size]) {
      cartData[itemId][size]--;
      
      if (cartData[itemId][size] === 0) {
        const product = products.find((p) => p._id === itemId);
        const confirmRemove = window.confirm(
          `Do you want to remove "${product?.name || 'this item'}" (Size: ${size}) from your cart?`
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
  }

  const removeCartItem = (itemId, size) => {
    const product = products.find((p) => p._id === itemId);
    const confirmRemove = window.confirm(
      `Do you want to remove "${product?.name || 'this item'}" (Size: ${size}) from your cart?`
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
  }

  // useEffect(() => {
  //   console.log(cartItems);
  // }, [cartItems]);

    const getCartCount = () => {
      let count = 0;
      for (const itemId in cartItems){
        for (const size in cartItems[itemId]){
          try {
            if (cartItems[itemId][size] > 0){
              count += cartItems[itemId][size];
            }
          }
          catch (error){
            console.log(error);
          }
        }
      }
      return count;
    };

    const getCartTotal = async () => {
      let total = 0;
      for (const itemId in cartItems){
        for (const size in cartItems[itemId]){
          try {
            if (cartItems[itemId][size] > 0){
              total += cartItems[itemId][size] * products.find((p) => p._id === itemId).price;
            }
          }
          catch (error){
            console.log(error);
          }
        }
      }
      return total;
    };

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
    getCartCount,
    getCartTotal,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
export default ShopContextProvider;
