import PropTypes from "prop-types";
import styles from "../styles/reset-page.module.css";


const ResetPassword = ({ handleOnClick }) => {
  return (
    <div className={styles.container}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <div className={styles.logo} aria-label="Company Logo"></div>
          <div className={styles.navLinks}>
            <a href="/about">About Us</a>
            <a href="/contact">Contact Us</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Use</a>
          </div>
        </div>
        <div className={styles.languageLogin}>
          <label htmlFor="language-select" className={styles.srOnly}>
            Select Language
          </label>
          <select id="language-select" className={styles.languageSelect}>
            <option>English (United States)</option>
          </select>
          <button className={styles.loginButton} onClick={(event) => handleOnClick(event, "Login Page")}>Log in</button>
        </div>
      </nav>

      {/* Reset Password Form */}
      <main className={styles.content}>
        <div className={styles.card}>
          <h2 className={styles.resetText}>Reset Password</h2>
          <p className={styles.instructionsText}>Enter your registered email address</p>

          <form>
            <label htmlFor="email" className={styles.srOnly}>
              Registered Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Registered Email Address"
              className={styles.input}
              required
            />
            <button type="submit" className={styles.resetButton}>
              Get Reset Code
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;


ResetPassword.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
};
