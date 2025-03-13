import styles from "../styles/reset-page.module.css";
import NavBar from "./NavigationBar";

export default function ResetPasswordPage() {
  return (
    <div className={styles.container}>
      <NavBar></NavBar>

      <main className={styles.content}>
        <div className={styles.card}>
          <h2 className={styles.resetText}>Reset Password</h2>
          <form>
            <label htmlFor="email" className={styles.srOnly}>
              Registered Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
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
