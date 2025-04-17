import connections from "../data/connections-data.js";
import SearchBar from "./SearchBar.jsx";
import Sidebar from "./Sidebar.jsx";

import styles from "../styles/connections.module.css";


export default function Connections() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.connectionList}>
        <SearchBar />

        {connections.map((connection, index) => (
          <div key={index} className={styles.connectionCard}>
            <img
              src={connection.image}
              alt={connection.name}
              className={styles.profileImage}
            />
            <div className={styles.details}>
              <h3 className={styles.name}>{connection.name}</h3>
              <p className={styles.description}>{connection.description}</p>
            </div>
            <button className={styles.messageButton}>Message</button>
          </div>
        ))}
      </div>
    </div>
  );
}
