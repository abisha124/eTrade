import React, { useState, useEffect } from "react";
import { useUser } from "../context/usercontext";
import styles from "./dashboard.module.css";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    buyNow,
    addresses,
    addAddress,
    removeAddress,
    selectedAddress,
    setSelectedAddress,
    confirmOrder,
  } = useUser();


  const [newAddress, setNewAddress] = useState("");

  useEffect(() => {
    if (addresses.length && !selectedAddress) {
      setSelectedAddress(addresses[0]);
    }
  }, [addresses, selectedAddress, setSelectedAddress]);

  const handleNewAddressSave = () => {
    const addr = newAddress.trim();
    if (!addr) return;
    addAddress(addr);
    setSelectedAddress(addr);
    setNewAddress("");
  };

  const handleDeleteAddress = (index) => {
    if (addresses[index] === selectedAddress) setSelectedAddress("");
    removeAddress(index);
  };

  if (cart.length === 0)
    return <p className={styles.emptyText}>Your cart is empty.</p>;

  return (
    <div className={styles.cartContainer}>
      <h3>Your Cart</h3>

      <div className={styles.addressSection}>
        <label><strong>Shipping Address:</strong></label>
        <div className={styles.addressCards}>
          {addresses.map((addr, i) => (
            <div
              key={i}
              className={`${styles.addressCard} ${
                selectedAddress === addr ? styles.selectedAddress : ""
              }`}
              onClick={() => setSelectedAddress(addr)}
            >
              <span>{addr}</span>
              <button
                className={styles.deleteBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteAddress(i);
                }}
              >
                &times;
              </button>
            </div>
          ))}

          <div className={styles.newAddressCard}>
            <input
              type="text"
              placeholder="Add new address..."
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNewAddressSave()}
              onBlur={handleNewAddressSave}
            />
          </div>
        </div>
      </div>

      {cart.map((product) => (
        <div key={product.id} className={styles.cartItem}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.productImage}
          />
          <div className={styles.productDetails}>
            <h4>{product.name}</h4>
            <p className={styles.price}>${product.price}</p>
            <div className={styles.cartActions}>
              <button
                onClick={() => buyNow({ ...product, selectedAddress })}
                className={styles.cardButton}
              >
                Buy Now
              </button>
              <button
                onClick={() => removeFromCart(product.id)}
                className={styles.cardButton}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className={styles.confirmWrap}>
        <button className={styles.confirmBtn} onClick={confirmOrder}>
          Confirm All
        </button>
      </div>
    </div>
  );
}
