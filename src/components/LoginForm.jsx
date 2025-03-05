import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import styles from "../styles/login-form.module.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.welcomeText}>Welcome Back</h2>
      <p className={styles.subtitle}>Pick up where you left off</p>

      <form className={styles.loginForm}>
        <label>Email address</label>
        <input
          type="email"
          className={styles.inputField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            className={styles.inputField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className={styles.togglePassword}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>
        <p className={styles.passwordInfo}>
          Use 8 or more characters with a mix of letters, numbers & symbols
        </p>

        <div className={styles.captchaContainer}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <label>I’m not a robot</label>
          <div className={styles.captchaBox}>reCAPTCHA</div>
        </div>

        <button type="submit" className={styles.loginBtn} disabled={!isChecked}>
          Log In
        </button>

        <a href="#" className={styles.forgotPassword}>
          Forgot Password
        </a>
      </form>
    </div>
  );
};

export default LoginForm;
