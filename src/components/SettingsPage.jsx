import styles from "../styles/settings-page.module.css";
import SearchBar from "./SearchBar";
import SideBar from "./SideBar";

const SettingsPage = () => {
  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.mainContent}>
        <SearchBar />
        <div className={styles.settingsContainer}>
          <div className={styles.settingOption}>
            <span>Change Password</span>
            <span className={styles.arrow}>&gt;</span>
          </div>
          <div className={styles.settingOption}>
            <span>Theme</span>
            <span className={styles.dropdown}>Light ▾</span>
          </div>
          <div className={styles.settingOption}>
            <span>Delete Account</span>
            <span className={styles.arrow}>&gt;</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
