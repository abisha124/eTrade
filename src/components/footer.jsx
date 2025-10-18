import React from "react";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h3 className={styles.logo}>eTrade</h3>
          <p className={styles.description}>
            Your one-stop shop for electronics, accessories, and more. We bring you quality at unbeatable prices.
          </p>
        </div>
        <div className={styles.column}>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/pages">Pages</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Customer Service</h4>
          <ul>
            <li><a href="/faq">FAQs</a></li>
            <li><a href="/returns">Returns</a></li>
            <li><a href="/shipping">Shipping Info</a></li>
            <li><a href="/support">Support</a></li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Subscribe</h4>
          <p>Get the latest deals and updates.</p>
          <form className={styles.news}>
            <input type="email" placeholder="Your email" />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} eTrade. All rights reserved.</p>
      </div>
    </div>
  );
}
