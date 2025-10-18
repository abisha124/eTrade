import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useAuth } from "../context/authcontext";
import styles from "./header.module.css";
import Google from "../pages/google";
import Dashboard from "../components/dashboard"; 

export default function Header({ search, setSearch, sort, setSort }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const { user, setUser, logout } = useAuth();

  const handleLoginClick = () => setShowLoginModal(true);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      alert(`Welcome ${result.user.displayName}`);
      setShowLoginModal(false);
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed: " + error.message);
    }
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const openDashboard = () => {
    setShowDashboard(true);
    setDropdownOpen(false);
  };

  const closeDashboard = () => setShowDashboard(false);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      setDropdownOpen(false);
      setShowDashboard(false);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.header}>
            <div className={styles.logo}><h2>eTrade</h2></div>
            <nav className={styles.nav}>
              <ul>
                <li>Home</li>
                <li>Shop</li>
                <li>Pages</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </nav>
            <div className={styles.menu}>
              <div className={styles.searchBox}>
                <FaSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search products..."
                  className={styles.searchInput}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className={styles.sortBox}>
                <select
                  className={styles.sortSelect}
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="">Sort By</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                  <option value="a-z">A-Z</option>
                  <option value="z-a">Z-A</option>
                </select>
              </div>
              <div className={styles.icons}>
                {user ? (
                  <div className={styles.userMenu}>
                    <div
                      className={styles.userProfile}
                      onClick={toggleDropdown}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={user.photoURL}
                        alt="User"
                        className={styles.userPhoto}
                      />
                      <span>{user.displayName}</span>
                    </div>

                    {dropdownOpen && (
                      <div className={styles.dropdown}>
                        <button onClick={openDashboard}>Dashboard</button>
                        <button onClick={handleLogout}>Logout</button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <button
                      onClick={handleLoginClick}
                      className={styles.loginBtn}
                    >
                      Login
                    </button>
                    {showLoginModal && (
                      <Google
                        onGoogleLogin={handleGoogleLogin}
                        onCancel={() => setShowLoginModal(false)}
                      />
                    )}
                  </>
                )}
            
              </div>
            </div>
          </div>
        </div>
      </div>
   {user && showDashboard && (
  <>
    <div className={styles.overlay} onClick={closeDashboard}></div>
    <div className={styles.dashboardPanel}>
      <div className={styles.dashboardHeader}>
        <h3>Dashboard</h3>
        <FaTimes onClick={closeDashboard} className={styles.closeIcon} />
      </div>
      <Dashboard user={user} />
    </div>
  </>
)}

    </>
  );
}
