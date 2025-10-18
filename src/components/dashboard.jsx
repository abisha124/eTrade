import React, { useState } from "react";
import Wishlist from "./Wishlist";
import Cart from "./Cart";
import Orders from "./Orders";
import styles from "./dashboard.module.css";

export default function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("wishlist");

  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.sidebar}>
        <div className={styles.userInfo}>
          {user?.photoURL && (
            <img src={user.photoURL} alt="user" className={styles.userPhoto} />
          )}
          <h3>{user?.displayName || "User"}</h3>
          <p>{user?.email}</p>
        </div>

        <ul className={styles.menu}>
          <li
            className={activeTab === "wishlist" ? styles.active : ""}
            onClick={() => setActiveTab("wishlist")}
          >
            Wishlist
          </li>
          <li
            className={activeTab === "cart" ? styles.active : ""}
            onClick={() => setActiveTab("cart")}
          >
            Cart
          </li>
          <li
            className={activeTab === "orders" ? styles.active : ""}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </li>
          
        </ul>
      </div>

      <div className={styles.content}>
        {activeTab === "wishlist" && <Wishlist />}
        {activeTab === "cart" && <Cart />}
        {activeTab === "orders" && <Orders />}
      </div>
    </div>
  );
}
