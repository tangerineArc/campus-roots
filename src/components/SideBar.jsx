import { useState } from "react";
import {
  Home,
  LogOut,
  Mail,
  Settings,
  User,
  Users,
  Menu
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "../styles/side-bar.module.css";

export default function SideBar() {
  const location = useLocation();
  const isFeedActive = location.pathname === "/" || location.pathname === "/HomePageStudents";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Hamburger Menu Button */}
      <button className={styles.hamburger} onClick={toggleSidebar}>
        <Menu />
      </button>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.active : ""}`}>
        <div className={styles.logo}>SAAR</div>
        <nav className={styles.menu}>
          <NavLink
            to="/HomePageStudents"
            className={isFeedActive ? styles.active : ""}
            onClick={toggleSidebar}
          >
            <Home /> Feed
          </NavLink>
          <NavLink to="/connections" className={({ isActive }) => (isActive ? styles.active : "")} onClick={toggleSidebar}>
            <Users /> Connections
          </NavLink>
          <NavLink to="/messages" className={({ isActive }) => (isActive ? styles.active : "")} onClick={toggleSidebar}>
            <Mail /> Messages
          </NavLink>
          <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")} onClick={toggleSidebar}>
            <User /> Profile
          </NavLink>
        </nav>
        <div className={styles.bottomMenu}>
          <NavLink to="/" onClick={toggleSidebar}>
            <Settings /> Settings
          </NavLink>
          <NavLink to="/" className={styles.logout} onClick={toggleSidebar}>
            <LogOut className={styles.logoutIcon} /> <div className={styles.logoutText}>Logout</div>
          </NavLink>
        </div>
      </aside>
    </>
  );
}
