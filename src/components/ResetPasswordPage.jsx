import styles from "../styles/reset-page.module.css";

export default function ResetPasswordPage() {
  return (
    <div className={styles.container}>
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

        <button className={styles.loginButton}>Log in</button>
      </nav>

      <main className={styles.content}>
        <div className={styles.card}>
          <h2 className={styles.resetText}>Reset Password</h2>
          <p className={styles.instructionsText}>
            Enter your registered email address
          </p>

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
}
