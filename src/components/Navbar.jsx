import { Link, useLocation } from "react-router-dom";

import styles from "../styles/navbar.module.css";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <div className={styles.logo}></div>
        <a href="#">About Us</a>
        <a href="#">Contact Us</a>
      </div>

      <div className={styles.navRight}>
        {pathname !== "/sign-up/student" && (
          <Link to="/sign-up/student">
            <button className={styles.btn} type="button">
              Student Sign Up
            </button>
          </Link>
        )}

        {pathname !== "/sign-up/alumnus" && (
          <Link to="/sign-up/alumnus">
            <button className={styles.btn} type="button">
              Alumnus Sign Up
            </button>
          </Link>
        )}

        {pathname !== "/sign-in" && (
          <Link to="/sign-in">
            <button className={styles.btn} type="button">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
