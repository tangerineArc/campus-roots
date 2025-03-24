import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";

import styles from "../styles/sign-up-page.module.css";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  const { category } = useParams();

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.card}>
          <h2 className={styles.title}>
            Sign up as {category === "alumnus" ? "Alumnus" : "Student"}
          </h2>

          <form className={styles.form}>
            <div className={styles.row}>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                required
                className={styles.input}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                required
                className={styles.input}
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Institute email address"
              required
              className={styles.input}
            />

            <div className={styles.row}>
              <input
                type="text"
                name="countryCode"
                placeholder="+91"
                required
                className={`${styles.countryCodeInput} ${styles.input}`}
              />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone number"
                required
                className={styles.input}
              />
            </div>

            <div className={styles.passwordContainer}>
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={togglePassword}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                className={`${styles.input} ${styles.passwordInput}`}
              />
            </div>
            <p className={styles.passwordHint}>
              Use 8 or more characters with a mix of letters, numbers and
              symbols
            </p>

            <div className={styles.termsCheckbox}>
              <input
                type="checkbox"
                id="terms-agreement"
                name="termsAgreed"
                required
              />
              <label htmlFor="terms-agreement">
                By creating an account, I agree to the Terms of use and Privacy
                Policy
              </label>
            </div>

            <button type="submit" className={styles.btn}>
              Sign up
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
