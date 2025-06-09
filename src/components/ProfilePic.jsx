import PropTypes from "prop-types";
import defaultProfilePic from "../assets/default-profile-picture.jpg";

const ProfilePic = ({ src, alt = "Profile Picture" }) => {
  const isValidImage = src && (src.startsWith('data:image') || src.startsWith('http'));

  return (
    <img
      src={isValidImage ? src : defaultProfilePic}
      alt={alt}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = defaultProfilePic;
      }}
    />
  );
};

ProfilePic.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string
};

export default ProfilePic;
