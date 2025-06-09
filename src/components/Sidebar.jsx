import {
  CircleUserRound,
  Film,
  LogOut,
  MessagesSquare,
  Satellite,
  Settings
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useAuth } from "../contexts/auth-context.jsx";

import SiteLogo from "./SiteLogo.jsx";

import styles from "../styles/sidebar.module.css";

export default function Sidebar() {
  const { signOut, user } = useAuth();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className={styles.mainLayout}>
        <aside className={styles.sidebar}>
          {!isMobile && <SiteLogo className={styles.logo} />}

          <nav className={styles.menu}>
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <Film className={styles.icon} />
              <span>Feed</span>
            </NavLink>
            <NavLink
              to="/connections"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <Satellite className={styles.icon} />
              <span>Connections</span>
            </NavLink>
            <NavLink
              to="/messages"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <MessagesSquare className={styles.icon} />
              <span>Messages</span>
            </NavLink>
            <NavLink
              to={`/profile/${user.id}`}
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <CircleUserRound className={styles.icon} />
              <span>Profile</span>
            </NavLink>

            {isMobile && (
              <>
                <NavLink
                  to="/settings"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  <Settings className={styles.icon} />
                  <span>Settings</span>
                </NavLink>
                <NavLink to="/" className={styles.logout}>
                  <LogOut className={styles.logoutIcon} />
                  <div className={styles.logoutText}>Logout</div>
                </NavLink>
              </>
            )}
          </nav>

          {!isMobile && (
            <div className={styles.bottomMenu}>
              <NavLink
                to="/settings"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <Settings className={styles.icon} />
                <span>Settings</span>
              </NavLink>
              <NavLink to="/" className={styles.logout} onClick={signOut}>
                <LogOut className={styles.logoutIcon} />
                <div className={styles.logoutText}>Logout</div>
              </NavLink>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
