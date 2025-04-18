import { Link, Navigate } from "react-router-dom";

import microsoftLogo from "../assets/microsoft-logo.svg";

import { useAuth } from "../contexts/auth-context.jsx";

import styles from "../styles/sign-in-page.module.css";

export default function SignInPage() {
  const { user } = useAuth();

  if (user) {
    console.log(user);
    return <Navigate to="/home" />;
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.imageSection}></div>

      <div className={styles.loginContainer}>
        <p className={styles.welcomeText}>Welcome aboard</p>
        <p className={styles.subtitle}>or pick up where you left off</p>

        <Link
          className={styles.signInLink}
          to={`${import.meta.env.VITE_API_SERVER_URL}/auth/microsoft`}
        >
          <img src={microsoftLogo} alt="" width="20" height="20" />
          Sign In with Microsoft
        </Link>
      </div>
    </div>
  );
}
