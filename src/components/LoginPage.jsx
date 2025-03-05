import React from "react";
import campusImage from '../assets/campus.png';
import styles from "../styles/login-page.module.css";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <div className={styles.logo}></div>
          <a href="#">About Us</a>
          <a href="#">Contact Us</a>
        </div>
        <div className={styles.navRight}>
          <select className={styles.languageSelector}>
            <option>English (United States)</option>
            <option>Hindi (हिन्दी)</option>
          </select>
          <button className={styles.signupButton}>Student sign up</button>
          <button className={styles.signupButton}>Alumni sign up</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className={styles.container}>
        <div className={styles.imageSection}>
          <img src={campusImage} alt="Campus" className={styles.image} />
        </div>
        <div className={styles.loginSection}>
          <LoginForm></LoginForm>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
