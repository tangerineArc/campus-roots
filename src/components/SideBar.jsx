import {
  Home,
  LogOut,
  Mail,
  Settings,
  User,
  Users
} from "lucide-react";
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
          <Home /> Feed
        </NavLink>
        <NavLink to="/connections" className={({ isActive }) => isActive ? styles.active : ""}>
          <Users /> Connections
        </NavLink>
        <NavLink to="/messages" className={({ isActive }) => isActive ? styles.active : ""}>
          <Mail /> Messages
        </NavLink>
        <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ""}>
          <User /> Profile
        </NavLink>
      </nav>
      <div className={styles.bottomMenu}>
        <NavLink to="/">
          <Settings /> Settings
        </NavLink>
        <NavLink to="/" className={styles.logout}>
          <LogOut className={styles.logoutIcon} /> <div className={styles.logoutText}>Logout</div>
        </NavLink>
      </div>
    </aside>
  );
}