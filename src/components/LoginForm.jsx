import { Eye, EyeOff } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";


import styles from "../styles/login-form.module.css";

export default function LoginForm({ handleOnClick }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.loginContainer}>
      <p className={styles.welcomeText}>Welcome Back</p>
      <p className={styles.subtitle}>Pick up where you left off</p>

      <form className={styles.loginForm}>
        <label htmlFor="email">Email address</label>
        <input id="email" type="email" className={styles.inputField} required />

        <label htmlFor="password">Password</label>
        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            className={styles.inputField}
            id="password"
            required
          />
          <span
            className={styles.togglePassword}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <>
                <EyeOff size={18} /> Hide
              </>
            ) : (
              <>
                <Eye size={18} /> View
              </>
            )}
          </span>
        </div>

        <button type="submit" className={styles.loginBtn}>
          Log In
        </button>

        <a href="#" className={styles.forgotPassword} onClick={(event) => handleOnClick(event, "Reset Password")}>
          Forgot Password
        </a>
      </form>
    </div>
  );
}


LoginForm.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
};