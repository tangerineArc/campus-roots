import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";

import styles from "../styles/reset-password-page.module.css";

export default function ResetPasswordPage() {
  const { category } = useParams();

  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.content}>
        <div className={styles.card}>
          <h2 className={styles.resetText}>
            {category === "email-input" && "Reset Password"}
            {category === "code-input" && "Check Your Inbox"}
            {category === "password-input" && "Set New Password"}
          </h2>

          {category === "code-input" && (
            <div className={styles.hint}>
              A 6-digit reset code has been sent to the provided email address.
            </div>
          )}

          {category === "password-input" && (
            <div className={styles.hint}>
              Create a new password. Ensure that it is different from the
              previous password.
            </div>
          )}

          <form className={styles.form}>
            <label htmlFor="email" className={styles.label}>
              {category === "email-input" && "Registered Email Address"}
              {category === "code-input" && "Reset Code"}
            </label>

            {category === "email-input" && (
              <input
                type="email"
                name="email"
                className={styles.input}
                required
              />
            )}

            {category === "code-input" && (
              <input
                type="number"
                name="resetCode"
                className={styles.input}
                required
              />
            )}

            {category === "password-input" && (
              <>
                <input
                  type="password"
                  name="password"
                  className={styles.input}
                  placeholder="New Password"
                  required
                />
                <input
                  type="password"
                  name="password"
                  className={styles.input}
                  placeholder="Confirm Password"
                  required
                />
              </>
            )}

            <button type="submit" className={styles.btn}>
              {category === "email-input" && "Get Reset Code"}
              {category === "code-input" && "Verify Code"}
              {category === "password-input" && "Update Password"}
            </button>
          </form>

          {category === "code-input" && (
            <p className={styles.sendAgain}>
              Haven&apos;t received the code yet? <a href="">Resend mail</a>
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
