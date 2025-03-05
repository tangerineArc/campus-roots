import styles from "../styles/reset-page.module.css";

const ResetPassword = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.navLeft}>
          <div className={styles.logo}></div>
          <div className={styles.navLinks}>
            <a href="#">About Us</a>
            <a href="#">Contact Us</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </div>
        </div>
        <div className={styles.languageLogin}>
          <select className={styles.languageSelect}>
            <option>English (United States)</option>
          </select>
          <button className={styles.loginButton}>Log in</button>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.card}>
          <h2 className={styles.resetText}>Reset password</h2>
          <p className={styles.instructionsText}>Enter registered Email Address</p>
          <input type="email" placeholder="Registered Email address" className={styles.input} />
          <button className={styles.resetButton}>Get Reset Code</button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;