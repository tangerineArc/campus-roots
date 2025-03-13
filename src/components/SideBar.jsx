import { Link } from "react-router-dom";
import styles from "../styles/side-bar.module.css";
import { 
  FaHome, FaUserFriends, FaEnvelope, FaUser, 
  FaCog, FaSignOutAlt, FaBell, FaThumbsUp, 
  FaComment, FaShare, FaPaperPlane 
} from "react-icons/fa";

export default function SideBar() {
  return ( <aside className={styles.sidebar}>
          <div className={styles.logo}>SAAR</div>
          <nav className={styles.menu}>
            <a href="#" className={styles.active}><FaHome /> Feed</a>
            <a href="#"><FaUserFriends /> Connections</a>
            <a href="#"><FaEnvelope /> Messages</a>
            <a href="#"><FaUser /> Profile</a>
          </nav>
          <div className={styles.bottomMenu}>
            <a href="#"><FaCog /> Settings</a>
            <a href="/" className={styles.logout}><FaSignOutAlt /> Logout</a>
          </div>
        </aside>);
}