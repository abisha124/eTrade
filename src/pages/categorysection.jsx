import React from "react";
import styles from "./categorysection.module.css";
import image1 from "../assets/mobile.png";
import image2 from "../assets/computer.png";
import image3 from "../assets/access.png";
import image4 from "../assets/lap.png";
import image5 from "../assets/monitor.png";
import image6 from "../assets/camera.png";
import image7 from "../assets/mouse.png";

export default function CategorySection() {
  const categories = [
    { id: 1, name: "Mobiles", img: image1 },
    { id: 2, name: "Computers", img: image2 },
    { id: 3, name: "Accessories", img: image3 },
    { id: 4, name: "Laptops", img: image4 },
    { id: 5, name: "Monitors", img: image5 },
    { id: 6, name: "Cameras", img: image6 },
    { id: 7, name: "Mouse", img: image7 },
  ];

  return (
    <section className={styles.categorySection}>
      <div className={styles.head}>
      <h2 className={styles.title}>Browse by Category</h2>

      <div className={styles.grid}>
        {categories.map((category) => (
          <div key={category.id} className={styles.card}>
            <img src={category.img} alt={category.name} className={styles.icon} />
            <p className={styles.name}>{category.name}</p>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
