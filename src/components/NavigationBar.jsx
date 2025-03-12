import { Link } from "react-router-dom";
import styles from "../styles/nav-bar.module.css";


export default function NavBar() {
  return (<div className={styles.navbar}>
    <div className={styles.navLeft}>
      <div className={styles.logo}></div>
      <div className={styles.navLinks}>
        <a href="#">About Us</a>
        <a href="#">Contact Us</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Use</a>
      </div>
    </div>

    <Link to="/login">
      <button className={styles.loginButton}>Log in</button>
    </Link>
  </div>);
}