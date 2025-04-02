import { CircleCheck, Heart, MessageCircle, Share2 } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";

import defaultProfilePicture from "../assets/default-profile-picture.jpg";

import styles from "../styles/post.module.css";

export default function Post({ data }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(data.likesCount);

  const handleLike = () => {
    setLiked(!liked);
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={data.profilePic || defaultProfilePicture} />
        <div className={styles.info}>
          <h3>
            {data.name}
            <CircleCheck className={styles.badge} />
          </h3>
          <span>
            {data.headline} • {data.createdBefore}
          </span>
        </div>
      </div>

      <p className={styles.postBody}>{data.postBody}</p>

      {data.imageUrls.map((url, idx) => (
        <img className={styles.postImage} src={url} key={idx} />
      ))}

      <div className={styles.postActions}>
        <button onClick={handleLike}>
          <Heart
            className={`${styles.iconLike} ${liked ? styles.liked : ""}`}
          />
          {likesCount}
        </button>
        <button>
          <MessageCircle className={styles.icon} />
          {data.commentsCount}
        </button>
        <button>
          <Share2 className={styles.icon} />
        </button>
      </div>
    </div>
  );
}

Post.propTypes = {
  data: PropTypes.exact({
    id: PropTypes.number,
    name: PropTypes.string,
    headline: PropTypes.string,
    profilePic: PropTypes.string,
    createdBefore: PropTypes.string,
    postBody: PropTypes.string,
    likesCount: PropTypes.number,
    commentsCount: PropTypes.number,
    imageUrls: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
