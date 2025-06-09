import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import defaultProfilePicture from "../assets/default-profile-picture.jpg";
import styles from "../styles/search-results.module.css";

export default function SearchResults({ results }) {
  const navigate = useNavigate();

  if (!results || !Array.isArray(results)) {
    return null;
  }

  return (
    <div className={styles.container}>
      {results.map((user) => (
        <div
          key={user.id}
          className={styles.userCard}
          onClick={() => navigate(`/profile/${user.id}`)}
          style={{ cursor: 'pointer' }}
        >
          <img src={user.avatar || defaultProfilePicture} alt="Profile" className={styles.profilePic} />
          <span className={styles.userName}>{user.name}</span>
        </div>
      ))}
    </div>
  );
}

SearchResults.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string
    })
  )
}; 