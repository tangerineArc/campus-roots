import Navbar from "../components/Navbar.jsx";

import styles from "../styles/reset-password-page.module.css";

export default function ResetPasswordPage() {
  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.content}>
        <div className={styles.card}>
          <h2 className={styles.resetText}>Reset Password</h2>

          <form className={styles.form}>
            <label htmlFor="email" className={styles.label}>
              Registered Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              required
            />

            <button type="submit" className={styles.btn}>
              Get Reset Code
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
