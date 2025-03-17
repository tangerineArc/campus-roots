import { useState } from "react";
import styles from "../styles/change-password.module.css";
import NavBar from "./NavigationBar";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (<>
    <NavBar></NavBar>
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Set a new password</h2>
        <p className={styles.subtitle}>
          Create a new password. <br />Ensure it differs from previous ones for security.
        </p>
        <form className={styles.form}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            className={styles.input}
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className={styles.label}>Confirm Password</label>
          <input
            type="password"
            className={styles.input}
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className={styles.button} disabled={!password || password !== confirmPassword}>
            Update Password
          </button>
        </form>
      </div>
    </div>
  </>
  );
};

export default ChangePassword;
