
import React from "react";
import { useUser } from "../context/usercontext";
import styles from "./dashboard.module.css";

export default function Wishlist() {
  const { wishlist, removeFromWishlist, moveWishlistToCart } = useUser();

  if (wishlist.length === 0) return <p>Your wishlist is empty.</p>;

  return (
    <div className={styles.tabInner}>
      <h3>Your Wishlist</h3>
      {wishlist.map((p) => (
        <div key={p.id} className={styles.item}>
          <img src={p.image} alt={p.name} />
          <span>{p.name}</span>
          <span>${p.price}</span>
          <div>
            <button onClick={() => removeFromWishlist(p.id)}>Remove</button>
            <button onClick={() => moveWishlistToCart(p)}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}
