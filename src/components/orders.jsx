import React from "react";
import { useUser } from "../context/usercontext";
import styles from "./dashboard.module.css";

export default function Orders() {
  const { orders, updateOrderStatus, user } = useUser();

  if (orders.length === 0) return <p>No orders placed yet.</p>;

  const handleStatusChange = (index, newStatus) => {
    updateOrderStatus(index, newStatus);
  };

  return (
    <div className={styles.tabInner}>
      <h3>Your Orders</h3>
      {orders.map((order, index) => (
        <div key={index} className={styles.item}>
          <img src={order.image} alt={order.name} />
          <span>{order.name}</span>
          <span>${order.price}</span>
          <span>
            Status:{" "}
            {user?.isAdmin ? (
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(index, e.target.value)}
                className={styles.statusSelect}
              >
                <option value="On Process">On Process</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            ) : (
              <span
                className={`${styles.statusBadge} ${
                  styles[order.status.replace(" ", "").toLowerCase()]
                }`}
              >
                {order.status}
              </span>
            )}
          </span>
          <div className={styles.orderDates}>
            {order.statusDates &&
              Object.entries(order.statusDates).map(([status, date]) => (
                <div key={status}>
                  {status}: {date}
                </div>
              ))}
          </div>

          <div className={styles.orderDate}>
            Ordered on: {order.date || "N/A"}
          </div>
        </div>
      ))}
    </div>
  );
}
