import styles from "../styles/email-verification.module.css";

const EmailVerification = () => {
  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <div className={styles.navbar}>
        <div className={styles.navLeft}>
          <div className={styles.logo}></div>
          <div className={styles.navLinks}>
            <a href="#">About Us</a>
            <a href="#">Contact Us</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </div>
        </div>
        <div className={styles.languageLogin}>
          <select className={styles.languageSelect}>
            <option>English (United States)</option>
          </select>
          <button className={styles.loginButton}>Log in</button>
        </div>
      </div>
      <div className={styles.remainingBody}>
      <div className={styles.card}>
        <h2 className={styles.title}>Check your email</h2>
        <p className={styles.description}>
          We have sent a reset link to your registered email id. <br />
          Enter the 5-digit code that is mentioned in the email.
        </p>
        <div className={styles.inputContainer}>
          {[...Array(5)].map((_, index) => (
            <input key={index} type="text" maxLength="1" className={styles.input} />
          ))}
        </div>
        <button className={styles.verifyButton} disabled>Verify Code</button>
        <p className={styles.resendText}>
          Haven’t received the email yet? <a href="#" className={styles.resendLink}>Resend email</a>
        </p>
      </div>
      </div>
    </div>
  );
};

export default EmailVerification;