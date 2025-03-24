import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "../styles/sign-in-form.module.css";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className={styles.loginContainer}>
      <p className={styles.welcomeText}>Welcome Back</p>
      <p className={styles.subtitle}>Pick up where you left off</p>

      <form className={styles.form}>
        <label htmlFor="email" className={styles.label}>
          Email address
        </label>
        <input id="email" type="email" className={styles.inputField} required />

        <div className={styles.labelContainer}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <span
            className={styles.togglePassword}
            onClick={togglePassword}
          >
            {showPassword ? <EyeOff size="18" /> : <Eye size="18" />}
            {showPassword ? "hide" : "view"}
          </span>
        </div>
        <input
          type={showPassword ? "text" : "password"}
          className={styles.inputField}
          id="password"
          required
        />

        <Link to="/HomePageStudents">
          <button type="submit" className={styles.loginBtn}>
            Log In
          </button>
        </Link>

        <Link to="/reset-password" className={styles.forgotPassword}>
          Forgot Password
        </Link>
      </form>
    </div>
  );
}
