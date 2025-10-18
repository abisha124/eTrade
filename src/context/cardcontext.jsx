import React, { createContext, useState, useContext } from 'react';
import api from '../api/axiosInstance';
import { AuthContext } from './authcontext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState(null);

  React.useEffect(() => {
    if (!user) return;
    (async () => {
      const res = await api.get(`/carts?userId=${user.id}`);

      setCart(res.data[0] || null);
    })();
  }, [user]);

  const addToCart = async (product) => {
    if (product.stock === 0) return alert('Out of stock');
    if (!user) return alert('Please login');

    if (!cart) {
      const newCart = { userId: user.id, items: [{ productId: product.id, qty: 1 }] };
      const res = await api.post('/carts', newCart);
      setCart(res.data);
    } else {
      const existingItem = cart.items.find(i => i.productId === product.id);
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        cart.items.push({ productId: product.id, qty: 1 });
      }
      await api.put(`/carts/${cart.id}`, cart);
      setCart({ ...cart });
    }
  };

  const clearCart = async () => {
    if (!cart) return;
    await api.delete(`/carts/${cart.id}`);
    setCart(null);
  };

  return <CartContext.Provider value={{ cart, addToCart, clearCart }}>{children}</CartContext.Provider>
}