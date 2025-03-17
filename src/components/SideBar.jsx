import {
  FaCog,
  FaEnvelope,
  FaHome,
  FaSignOutAlt,
  FaUser,
  FaUserFriends
} from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import styles from "../styles/side-bar.module.css";

export default function SideBar() {
  const location = useLocation();
  const isFeedActive = location.pathname === "/" || location.pathname === "/HomePageStudents";

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>SAAR</div>
      <nav className={styles.menu}>
        <NavLink
          to="/HomePageStudents"
          className={isFeedActive ? styles.active : ""}
        >
          <FaHome /> Feed
        </NavLink>
        <NavLink to="/connections" className={({ isActive }) => isActive ? styles.active : ""}>
          <FaUserFriends /> Connections
        </NavLink>
        <NavLink to="/messages" className={({ isActive }) => isActive ? styles.active : ""}>
          <FaEnvelope /> Messages
        </NavLink>
        <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ""}>
          <FaUser /> Profile
        </NavLink>
      </nav>
      <div className={styles.bottomMenu}>
        <NavLink to="/">
          <FaCog /> Settings
        </NavLink>
        <NavLink to="/" className={styles.logout}>
          <FaSignOutAlt className={styles.logoutIcon} /> <div className={styles.logoutText}>Logout</div>
        </NavLink>
      </div>
    </aside>
  );
}
