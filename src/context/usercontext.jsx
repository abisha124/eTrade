import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    displayName: "Abisha",
    email: "test@test.com",
    photoURL: "",
    isAdmin: true,
  });
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
    setWishlist(JSON.parse(localStorage.getItem("wishlist")) || []);
    setOrders(JSON.parse(localStorage.getItem("orders")) || []);
    setAddresses(JSON.parse(localStorage.getItem("addresses")) || []);
    setSelectedAddress(localStorage.getItem("selectedAddress") || "");
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("addresses", JSON.stringify(addresses));
    localStorage.setItem("selectedAddress", selectedAddress);
  }, [cart, wishlist, orders, addresses, selectedAddress]);

  const addToCart = (product) => {
    if (product.stock === 0) return alert("Out of stock!");
    if (!cart.find((p) => p.id === product.id)) {
      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const buyNow = (product) => {
    if (!selectedAddress) return alert("Please select a shipping address!");
    const now = new Date().toLocaleString();
    const newOrder = {
      ...product,
      quantity: 1,
      shippingAddress: selectedAddress,
      status: "On Process",
      date: now,
      statusDates: { "On Process": now }, 
    };
    setOrders((prev) => [...prev, newOrder]);
    setCart((prev) => prev.filter((p) => p.id !== product.id));
    alert(`${product.name} ordered successfully!`);
  };

  const confirmOrder = () => {
    if (!selectedAddress) return alert("Please select a shipping address!");
    if (cart.length === 0) return alert("Cart is empty!");
    const now = new Date().toLocaleString();
    const newOrders = cart.map((item) => ({
      ...item,
      shippingAddress: selectedAddress,
      status: "On Process",
      date: now,
      statusDates: { "On Process": now },
    }));
    setOrders((prev) => [...prev, ...newOrders]);
    setCart([]);
    alert("All cart items confirmed successfully!");
  };

  const addToWishlist = (product) => {
    if (!wishlist.find((p) => p.id === product.id)) {
      setWishlist((prev) => [...prev, product]);
    }
  };
  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };
  const moveWishlistToCart = (product) => {
    removeFromWishlist(product.id);
    addToCart(product);
    alert(`${product.name} moved to Cart!`);
  };

  const addAddress = (address) => {
    if (!address.trim()) return;
    setAddresses((prev) => [...prev, address]);
    setSelectedAddress(address);
  };
  const removeAddress = (index) => {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
    if (selectedAddress === addresses[index]) setSelectedAddress("");
  };
  const updateOrderStatus = (index, status) => {
    const updatedOrders = [...orders];
    const order = updatedOrders[index];
    const now = new Date().toLocaleString();

    if (!order.statusDates) order.statusDates = {};
    order.statusDates[status] = now;

    order.status = status;
    setOrders(updatedOrders);
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setWishlist([]);
    setOrders([]);
    setAddresses([]);
    setSelectedAddress("");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        cart,
        wishlist,
        orders,
        addresses,
        selectedAddress,
        setSelectedAddress,
        addToCart,
        removeFromCart,
        addToWishlist,
        removeFromWishlist,
        moveWishlistToCart,
        buyNow,
        confirmOrder,
        addAddress,
        removeAddress,
        updateOrderStatus,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
