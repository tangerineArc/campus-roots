import {
  CircleUserRound,
  Film,
  LogOut,
  MessagesSquare,
  Satellite,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import SiteLogo from "./SiteLogo.jsx";

import styles from "../styles/sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <SiteLogo />

      <nav className={styles.menu}>
        <NavLink
          to="/HomePageStudents"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <Film /> Feed
        </NavLink>
        <NavLink
          to="/connections"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <Satellite /> Connections
        </NavLink>
        <NavLink
          to="/messages"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <MessagesSquare /> Messages
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <CircleUserRound /> Profile
        </NavLink>
      </nav>

      <div className={styles.bottomMenu}>
        <NavLink
          to="/settings"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <Settings /> Settings
        </NavLink>
        <NavLink to="/" className={styles.logout}>
          <LogOut className={styles.logoutIcon} />
          <div className={styles.logoutText}>Logout</div>
        </NavLink>
      </div>
    </aside>
  );
}
