import { FaSearch } from "react-icons/fa";
import styles from "../styles/search-bar.module.css";

export default function SearchBar() {
  return (<>
    <div className={styles.searchContainer}>
      <input type="text" placeholder="Search..." className={styles.searchBar} />
      <FaSearch className={styles.searchIcon} />
    </div>
  </>);
}