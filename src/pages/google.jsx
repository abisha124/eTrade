
import React from "react";
import styles from "./google.module.css";

export default function Google({ onGoogleLogin, onCancel }) {
  return (
    <div className={styles.loginModal}>
      <div className={styles.modalContent}>
        <h3>Login</h3>
        <button onClick={onGoogleLogin} className={styles.googleBtn}>
          Login with Google
        </button>
        <button onClick={onCancel} className={styles.cancelBtn}>
          Cancel
        </button>
      </div>
    </div>
  );
}
