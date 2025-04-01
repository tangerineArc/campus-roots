import PropTypes from "prop-types";
import { useState } from "react";

import styles from "../styles/filter.module.css";

export default function Filter({ items = [] }) {
  const [selected, setSelected] = useState("recent");

  const handleSelection = (item) => {
    setSelected(item);
  };

  return (
    <div className={styles.container}>
      {items.map((item, idx) => (
        <button
          key={idx}
          className={`${styles.item} ${
            selected === item ? styles.selected : ""
          }`}
          onClick={() => {
            handleSelection(item);
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

Filter.propTypes = {
  items: PropTypes.array.isRequired,
};
