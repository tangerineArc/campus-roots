import { Search } from "lucide-react";
import PropTypes from "prop-types";

import styles from "../styles/search-bar.module.css";

export default function SearchBar({ onEditorChange }) {
  return (
    <label className={styles.container}>
      <input
        type="text"
        placeholder="search"
        className={styles.input}
        onChange={onEditorChange}
      />
      <Search className={styles.icon} />
    </label>
  );
}

SearchBar.propTypes = {
  onEditorChange: PropTypes.func
};
