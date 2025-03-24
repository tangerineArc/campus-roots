import SignInForm from "../components/SignInForm.jsx";
import Navbar from "../components/Navbar.jsx";

import styles from "../styles/sign-in-page.module.css";

export default function SignInPage() {
  return (
    <div className={styles.mainContainer}>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.imageSection}></div>
        <div className={styles.loginSection}>
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
