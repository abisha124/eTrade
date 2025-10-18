import React from "react";
import styles from "./heroSection.module.css";
import img from "../assets/headphone.png"
import img1 from "../assets/watch.png"

export default function HeroSection() {
  return (
    <div className={styles.head1}>
    <section className={styles.hero}>
      
      <div className={styles.textContent}>
        <p className={styles.deal}>Hot Deal This Week</p>
        <h1 className={styles.title}>Roco Wireless Headphone</h1>
        <p className={styles.price}>Price: <span>$400.00</span></p>
        <button className={styles.shopBtn}>Shop Now</button>
      </div>

      <div className={styles.imageContainer}>
        <img src={img}
          alt="Wireless Headphone"
          className={styles.headsetImage} />
          <img src={img1}
          alt="Watch"
          className={styles.watchimg}
          />
      </div>
    </section>
    </div>
  );
}
