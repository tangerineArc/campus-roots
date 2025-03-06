import { Link } from "react-router-dom";

import styles from "../styles/login-page.module.css";

import LoginForm from "./LoginForm.jsx";

export default function LoginPage() {
  return (
    <div className={styles.mainContainer}>
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <div className={styles.logo}></div>
          <a href="#">About Us</a>
          <a href="#">Contact Us</a>
        </div>

        <div className={styles.navRight}>
          <Link to="/signup/student">
            <button className={styles.signupButton} type="button">
              Student Sign Up
            </button>
          </Link>

          <Link to="/signup/alumnus">
            <button className={styles.signupButton} type="button">
              Alumnus Sign Up
            </button>
          </Link>
        </div>
      </nav>

      <div className={styles.container}>
        <div className={styles.imageSection}></div>
        <div className={styles.loginSection}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
