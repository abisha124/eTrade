import React from "react";
import styles from "./enhance.module.css";
import Image from "../assets/bluetooth.png";

export default function Enhance() {
  return (
    <section className={styles.product}>
      <div className={styles.content}>
        <h4 className={styles.h4}>Don't Miss!</h4>
        <h2 className={styles.title}>Enhance Your Music Experience</h2>
        <div className={styles.count}>
          <div className={styles.timer}>
            <span>15</span>
            <p>Day</p>
          </div>
          <div className={styles.timer}>
            <span>10</span>
            <p>Hr</p>
          </div>
          <div className={styles.timer}>
            <span>56</span>
            <p>Min</p>
          </div>
          <div className={styles.timer}>
            <span>54</span>
            <p>Sec</p>
          </div>
        </div>
        <button className={styles.button}>Check it Out!</button>
      </div>
      <div className={styles.imageWrapper}>
        <img
          src={Image}
          alt="Promo Headphones"
          className={styles.promoImage}/>
      </div>
    </section>
  );
}
