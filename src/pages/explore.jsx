import React, { useEffect, useState } from "react";
import styles from "./explore.module.css";
import { useUser } from "../context/usercontext";

export default function Explore({ search, sort }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);

  const { addToCart, addToWishlist } = useUser();//access to current use inf

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/products");
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className={styles.loading}>Loading products...</div>;
  if (error) return <div className={styles.loading}>Error: {error}</div>;

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes((search || "").toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "low-high") return a.price - b.price;
    if (sort === "high-low") return b.price - a.price;
    if (sort === "a-z") return a.name.localeCompare(b.name);
    if (sort === "z-a") return b.name.localeCompare(a.name);
    return 0;
  });

  const visibleProducts = sorted.slice(0, visibleCount);

  return (
    <div className={styles.productSec}>
     
      <h2 className={styles.title}>Explore our Products</h2>
      <div className={styles.grid}>
        {visibleProducts.map((p) => (
          <div key={p.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={p.image} alt={p.name} className={styles.image} />
            </div>
            <div className={styles.info}>
              <h3 className={styles.name}>{p.name}</h3>
              <p className={styles.price}>
                <span className={styles.newPrice}>${p.price}</span>
                {p.oldPrice && <span className={styles.oldPrice}>${p.oldPrice}</span>}
              </p>
              <div className={styles.buttons}>
                <button
                  className={styles.cardButton}
                  disabled={p.stock === 0}
                  onClick={() => addToCart(p)}
                >
                  Add to Cart
                </button>
                <button className={styles.cardButton} onClick={() => addToWishlist(p)}>
                  Wishlist
                </button>
              </div>
              <p className={p.stock === 0 ? styles.noStock : styles.inStock}>
                {p.stock === 0 ? "Out of Stock" : `${p.stock} left`}
              </p>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < sorted.length && (
        <div className={styles.getprod}>
          <button className={styles.cardButton} onClick={() => setVisibleCount((prev) => prev + 4)}>
            View More Products
          </button>
        </div>
      )}
    </div>
    
  );
}
