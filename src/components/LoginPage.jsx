import React from "react";
import styles from "../styles/Login-Page.module.css";
import campusImage from '../assets/campus.png';
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
          <h2>Welcome Back</h2>
          <p>Pick up where you left off</p>
          <form className={styles.form}>
            <label>Email address</label>
            <input type="email" className={styles.input} placeholder="Enter your email" />

            <label>Password</label>
            <input type="password" className={styles.input} placeholder="Enter your password" />

            <div className={styles.recaptcha}>
              <input type="checkbox" id="recaptcha" />
              <label htmlFor="recaptcha">I'm not a robot</label>
            </div>

            <button type="submit" className={styles.loginButton} disabled>
              Log In
            </button>

            <p className={styles.forgotPassword}>Forgot Password</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
