import { Search } from "lucide-react";
import styles from "../styles/search-bar.module.css";

export default function SearchBar() {
  return (
    <div className={styles.searchContainer}>
      <input type="text" placeholder="Search..." className={styles.searchBar} />
      <Search className={styles.searchIcon} />
    </div>
  );
}