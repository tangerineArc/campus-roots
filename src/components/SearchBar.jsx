import { Search } from "lucide-react";

import styles from "../styles/search-bar.module.css";

export default function SearchBar() {
  return (
    <label className={styles.container}>
      <input type="text" placeholder="search" className={styles.input} />
      <Search className={styles.icon} />
    </label>
  );
}
